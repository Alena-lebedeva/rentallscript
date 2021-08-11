import UserAccountType from '../../types/userAccountType';
import { UserProfile } from '../../models';

import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const AddPhoneNumber = {

    type: UserAccountType,

    args: {
        countryCode: { type: new NonNull(StringType) },
        phoneNumber: { type: new NonNull(StringType) },
    },

    async resolve({ request }, { countryCode, phoneNumber }) {

        // Check whether user is logged in
        if (request.user) {
            let published;

            const publish = await UserProfile.update({
                countryCode,
                phoneNumber
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

            if (published) {
                return {
                    status: '200',
                    countryCode,
                    phoneNumber
                };
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

export default AddPhoneNumber;

/**
mutation AddPhoneNumber($countryCode: String!, $phoneNumber: String!) {
    AddPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber) {
        status
    }
}
 */
