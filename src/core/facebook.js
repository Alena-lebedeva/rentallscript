import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User, UserLogin, UserClaim, UserProfile, UserVerifiedInfo, EmailToken } from '../data/models';
import { auth as config } from '../config';
// Send Email
import { sendEmail } from './email/sendEmail';
// Upload profile image from facebook
import { downloadFile } from './download/download';
// Helper
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter';
passport.use(new FacebookStrategy({
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: config.facebook.returnURL,
  profileFields: ['name', 'email', 'birthday', 'link', 'locale', 'timezone', 'picture.width(255).height(255)'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';
  let random = Date.now();
  const facebookLogin = async () => {
    if (req.user) {
      // For Facebook Verfication
      await UserVerifiedInfo.update({
        isFacebookConnected: true
      },
        {
          where: { userId: req.user.id },
        });
      done(null, {
        type: 'verification'
      });
    } else {
      // Check if the email is already available
      const userLogin = await User.findOne({
        attributes: ['email', 'id', 'userBanStatus', 'userDeletedAt'],
        where: { email: profile._json.email, userDeletedAt: null },
      });
      if (userLogin) {
        if (userLogin.userBanStatus == 1) {
          done(null, {
            id: userLogin.id,
            email: userLogin.email,
            type: 'userbanned'
          });
        } else if (userLogin.userDeletedAt != null) {
          done(null, {
            id: userLogin.id,
            email: userLogin.email,
            type: 'userDeleted'
          });
        } else {
          // There is an account associated with this email
          await UserVerifiedInfo.update({
            isFacebookConnected: true
          },
            {
              where: { userId: userLogin.id },
            });
          done(null, {
            id: userLogin.id,
            email: profile._json.email,
            type: 'login'
          });
        }
      } else {
        let dateOfBirth, formattedDateOfBirth;
        if (profile._json.birthday != "" && profile._json.birthday != null && profile._json.birthday != undefined) {
          dateOfBirth = profile._json.birthday.split("/");
          formattedDateOfBirth = dateOfBirth[1] + "-" + dateOfBirth[2] + "-" + dateOfBirth[0];
        } else {
          formattedDateOfBirth = null;
        }
        let picture;
        let isDefault = profile._json.picture.data.is_silhouette;
        // Do not upload when user only have default profile image
        if (!isDefault) {
          const profileUrl = profile._json.picture.data.url;
          const profilePictureData = await downloadFile(profileUrl);
          if (profilePictureData.status === 200) {
            picture = profilePictureData.filename;
          }
        }
        let updatedFirstName = capitalizeFirstLetter(profile._json.first_name);
        let updatedLastName = capitalizeFirstLetter(profile._json.last_name);
        let displayName = updatedFirstName + ' ' + updatedLastName;
        const user = await User.create({
          email: profile._json.email,
          emailConfirmed: true,
          password: User.generateHash(random.toString()),
          type: loginName,
          profile: {
            displayName,
            firstName: updatedFirstName,
            lastName: updatedLastName,
            dateOfBirth: formattedDateOfBirth,
            gender: profile._json.gender,
            picture,
          },
          userVerifiedInfo: {
            isFacebookConnected: true
          },
          emailToken: {
            token: random,
            email: profile._json.email
          }
        }, {
            include: [
              { model: UserProfile, as: 'profile' },
              { model: UserVerifiedInfo, as: 'userVerifiedInfo' },
              { model: EmailToken, as: 'emailToken' },
            ],
          });
        // Send Email
        let content = {
          token: random,
          name: profile._json.first_name,
          email: profile._json.email
        };
        sendEmail(profile._json.email, 'welcomeEmail', content);
        done(null, {
          id: user.id,
          email: user.email,
          type: 'login'
        });
      }
    }
  };
  facebookLogin().catch(done);
}));
/**
 * Sign in with Facebook.
 */
export default passport;
