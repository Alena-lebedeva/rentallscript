import UserAccountType from '../../types/userAccountType';
import { User, UserProfile } from '../../../data/models';

const getPhoneData = {

  type: UserAccountType,

  async resolve({ request, response }) {

    if (request.user && request.user.admin != true) {

      //Collect from Logged-in User
      let loggedInId = request.user.id;
      let loggedInEmail = request.user.email;

      // Get All User Profile Data
      const userProfile = await UserProfile.find({
        where: { userId: request.user.id },
      });

      const userEmail = await User.findOne({
        attributes: [
          'email'
        ],
        where: { id: request.user.id }
      })

      if (userProfile && userEmail) {

        return {
          userId: request.user.id,
          profileId: userProfile.dataValues.profileId,
          phoneNumber: userProfile.dataValues.phoneNumber,
          country: userProfile.dataValues.country,
          countryCode: userProfile.dataValues.countryCode,
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

export default getPhoneData;
