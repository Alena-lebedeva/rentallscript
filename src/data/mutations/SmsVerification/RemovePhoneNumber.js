import UserAccountType from '../../types/userAccountType';
import { UserProfile, UserVerifiedInfo } from '../../models';

const RemovePhoneNumber = {

  type: UserAccountType,

  args: {}, 

    async resolve({ request }) {

    // Check whether user is logged in
    if(request.user) {
        let published;

            const isValidUser = await UserProfile.count({
                where: {
                    userId: request.user.id,
                }
            });

            if (isValidUser) {
                const publish = await UserProfile.update({
                    countryCode: null,
                    phoneNumber: null,
                    countryName: null,
                    verificationCode: null
                }, {
                        where: {
                            userId: request.user.id
                        }
                }).spread(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        published = true;
                    }
                });

                const updatePhoneVerified = await UserVerifiedInfo.update({
                    isPhoneVerified: false
                }, {
                        where: {
                            userId: request.user.id
                        }
                });

                if (published) {
                    return {
                        status: '200'
                    };
                } else {
                    return {
                        status: '400'
                    }
                }

            } else {
                return {
                    status: '400'
                }
            }
      } else {
          return {
            status: "notLoggedIn"
          };
      }
    },
};

export default RemovePhoneNumber;

/**
mutation {
    RemovePhoneNumber {
        status
    }
}
 */
