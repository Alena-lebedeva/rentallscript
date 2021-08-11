import EmailTokenType from '../types/EmailTokenType';
import { EmailToken, User, UserProfile } from '../../data/models';

import { sendServerEmail } from '../../core/email/sendServerEmail';

const ResendConfirmEmail = {

    type: EmailTokenType,

    async resolve({ request, response }) {
        try {
            if (request.user && request.user.admin != true) {
                const userId = request.user.id;
                const email = request.user.email;
                let token = Date.now();
                let content = null;
    
                const checkEmailToken = await EmailToken.find({
                    where: {
                        userId,
                        email,
                    },
                    raw: true
                });

                const userData = await User.findOne({
                    attributes: ['email'],
                    include: [{
                        model: UserProfile, as: 'profile', required: true,
                        attributes: ['firstName']
                    }],
                    where: {
                        id: userId
                    },
                    raw: true
                });

                content = {
                    name: userData && (userData['profile.firstName'] || userData['profile']['firstName']),
                    email: userData && userData.email
                };
    
                if (checkEmailToken) {
                    content['token'] = checkEmailToken && checkEmailToken.token;
                } else {
                    const createEmailToken = await EmailToken.create({
                        userId,
                        email,
                        token
                    });
    
                    if (createEmailToken) {
                        content['token'] = token;
                    } 
                }

                const { emailStatus, emailErrorMessage } = await sendServerEmail(userId, 'confirmEmail', content);
                
                return await {
                    status: emailStatus,
                    errorMessage: emailErrorMessage
                };
            } else {
                return {
                    status: 'error'
                }
            }
        } catch(error) {
            console.log('error', error);
            return await {
                status: 400,
                errorMessage: error
            };
        }
    },
};

export default ResendConfirmEmail;