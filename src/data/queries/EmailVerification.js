import EmailTokenType from '../types/EmailTokenType';
import { EmailToken } from '../../data/models';

import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const EmailVerification = {

    type: EmailTokenType,

    args: {
        token: { type: new NonNull(StringType) },
        email: { type: new NonNull(StringType) },
    },

    async resolve({ request, response }, { token, email }) {

        if (request.user && request.user.admin != true) {

            const checkEmailConfirmation = await EmailToken.count({
                where: {
                    email,
                    token,
                    userId: request.user.id
                }
            });

            if (checkEmailConfirmation > 0) {
                return {
                    status: "confirmed"
                }
            } else {
                return {
                    status: "notAvailable"
                }
            }

        } else {
            return {
                status: 'notLoggedIn'
            }
        }

    },
};

export default EmailVerification;