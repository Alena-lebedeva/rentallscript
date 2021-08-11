import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';

import ForgotPasswordType from '../../types/EmailTokenType';
import { ForgotPassword, User, UserProfile } from '../../models';

import { sendServerEmail } from '../../../core/email/sendServerEmail';

const sendForgotPassword = {

    type: ForgotPasswordType,

    args: {
        email: { type: new NonNull(StringType) },
    },

    async resolve({ request, response }, { email }) {
        if (!request.user) {
            let userId, token = Date.now();
            let content = null;

            const getUser = await User.findOne({
                attributes: ['id'],
                where: {
                    email
                },
                include: [{
                    model: UserProfile, as: 'profile', required: true,
                    attributes: ['firstName']
                }],
                raw: true
            });

            if (getUser) {
                userId = getUser.id;
                const deleteOldToken = await ForgotPassword.destroy({
                    where: {
                        email,
                        userId
                    }
                });

                const createForgotPassword = await ForgotPassword.create({
                    email,
                    userId,
                    token
                });

                content = {
                    token,
                    email,
                    name: getUser && (getUser['profile.firstName'] || getUser['profile']['firstName'])
                };

                sendServerEmail(email, 'forgotPasswordLink', content);
                
                return await {
                    status: 200
                };
            } else {
                return {
                    status: 'notAvailable'
                }
            }
        } else {
            return {
                status: '400'
            }
        }
    },
};

export default sendForgotPassword;

/**
mutation sendForgotPassword($email: String!) {
    sendForgotPassword (email: $email) {
      status
    }
}
 */
