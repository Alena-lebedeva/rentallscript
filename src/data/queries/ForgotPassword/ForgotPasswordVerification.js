import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';

import ForgotPasswordType from '../../types/EmailTokenType';
import { ForgotPassword } from '../../models';

const forgotPasswordVerification = {

    type: ForgotPasswordType,

    args: {
        token: { type: new NonNull(StringType) },
        email: { type: new NonNull(StringType) },
    },

    async resolve({ request, response }, { token, email }) {

        if (!request.user) {

            const checkForgotPassword = await ForgotPassword.findOne({
                where: {
                    email,
                    token
                }
            });

            if (checkForgotPassword) {
                return {
                    status: '200'
                };
            } else {
                return {
                    status: '400'
                };
            }

        } else {
            return {
                status: '400'
            }
        }

    },
};

export default forgotPasswordVerification;

/**
query forgotPasswordVerification($email: String!, $token: String!) {
    forgotPasswordVerification (email: $email, token: $token) {
        id
        email
        token
        userId
        status
    }
}
 */