import UserAccountType from '../types/userAccountType';
import { User, UserProfile } from '../../data/models';

const userAccount = {
  type: UserAccountType,
  async resolve({ request, response }) {
    if (request.user && request.user.admin != true) {
      //Collect from Logged-in User
      let loggedInId = request.user.id;
      let loggedInEmail = request.user.email;
      /*return await UserProfile.findOne({
        where: { userId: loggedInId }
      });*/
      // Get All User Profile Data
      const userProfile = await UserProfile.find({
        attributes: [
          'profileId',
          'firstName',
          'lastName',
          'displayName',
          'dateOfBirth',
          'gender',
          'phoneNumber',
          'preferredLanguage',
          'preferredCurrency',
          'location',
          'info',
          'createdAt',
          'picture',
          'countryCode',
          'country',
          'countryName'
        ],
        where: { userId: request.user.id },
      });
      const userEmail = await User.findOne({
        attributes: [
          'email',
          'userBanStatus'
        ],
        where: { id: request.user.id }
      })

      if (userProfile && userEmail) {
        return {
          userId: request.user.id,
          profileId: userProfile.dataValues.profileId,
          firstName: userProfile.dataValues.firstName,
          lastName: userProfile.dataValues.lastName,
          displayName: userProfile.dataValues.displayName,
          gender: userProfile.dataValues.gender,
          dateOfBirth: userProfile.dataValues.dateOfBirth,
          email: userEmail.email,
          userBanStatus: userEmail.userBanStatus,
          phoneNumber: userProfile.dataValues.phoneNumber,
          preferredLanguage: userProfile.dataValues.preferredLanguage,
          preferredCurrency: userProfile.dataValues.preferredCurrency,
          location: userProfile.dataValues.location,
          info: userProfile.dataValues.info,
          createdAt: userProfile.dataValues.createdAt,
          picture: userProfile.dataValues.picture,
          countryCode: userProfile.dataValues.countryCode,
          country: userProfile.dataValues.country,
          countryName: userProfile.dataValues.countryName,
          status: "success"
        }
      }
    } else {
      return {
        status: "notLoggedIn"
      }
    }
  },
};
export default userAccount;
