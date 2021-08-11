import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import {
    User,
    UserProfile,
    UserVerifiedInfo,
    EmailToken
} from '../data/models';
import { auth as config } from '../config';
// Send Email
import { sendEmail } from './email/sendEmail';
// Upload profile image from google
import { downloadFile } from './download/download';
// Helper
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter';
passport.use(new GoogleStrategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: config.google.returnURL,
    passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
    /* eslint-disable no-underscore-dangle */
    const loginName = 'google';
    const claimType = 'urn:google:access_token';
    const googleLogin = async () => {
        let random = Date.now();
        if (req.user) {
            // For Google Verfication
            await UserVerifiedInfo.update({
                isGoogleConnected: true
            },
                {
                    where: { userId: req.user.id },
                });
            done(null, {
                type: 'verification'
            });
        } else {
            let email = profile && profile.emails && profile.emails[0] && profile.emails[0].value;
            const userLogin = await User.findOne({
                attributes: ['id', 'email', 'userBanStatus', 'userDeletedAt'],
                where: { email: email, userDeletedAt: null },
            });
            if (userLogin) {
                if (userLogin.userBanStatus == 1) {
                    done(null, {
                        id: userLogin.id,
                        email: userLogin.email,
                        type: 'userbanned'
                    });
                }
                else if (userLogin.userDeletedAt != null) {
                    done(null, {
                        id: userLogin.id,
                        email: userLogin.email,
                        type: 'userDeleted'
                    });
                } else {
                    // There is an account associated with this email
                    await UserVerifiedInfo.update({
                        isGoogleConnected: true
                    },
                        {
                            where: { userId: userLogin.id },
                        });
                    done(null, {
                        id: userLogin.id,
                        email: userLogin.email,
                        type: 'login'
                    });
                }
            } else {

                let picture;
                const profileUrl = profile._json.picture;
                const originalImage = profileUrl.replace('?sz=50', '');
                let email = profile && profile.emails && profile.emails[0] && profile.emails[0].value;

                if (!profile._json.image) {
                    const profilePictureData = await downloadFile(originalImage);
                    if (profilePictureData.status === 200) {
                        picture = profilePictureData.filename;
                    }
                }
                let updatedFirstName = capitalizeFirstLetter(profile._json.given_name);
                let updatedLastName = capitalizeFirstLetter(profile._json.family_name);
                let displayName = updatedFirstName + ' ' + updatedLastName;
                const user = await User.create({
                    email: email,
                    emailVerified: true,
                    password: User.generateHash(random.toString()),
                    type: loginName,
                    profile: {
                        displayName,
                        firstName: updatedFirstName,
                        lastName: updatedLastName,
                        dateOfBirth: profile._json.birthday,
                        gender: profile._json.gender,
                        picture,
                    },
                    userVerifiedInfo: {
                        isGoogleConnected: true
                    },
                    emailToken: {
                        token: random,
                        email: email
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
                    name: profile._json.name.givenName,
                    email: email
                };
                sendEmail(email, 'welcomeEmail', content);
                done(null, {
                    id: user.id,
                    email: user.email,
                    type: 'login'
                });
            }
        }
    };
    googleLogin().catch(done);
}));
export default passport;
