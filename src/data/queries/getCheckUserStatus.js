import UserType from '../types/UserType';
import { User } from '../models';
const getCheckUserStatus = {
    type: UserType,
    async resolve({ request }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {
            const userData = await User.findOne({
                attributes: [
                    'id', 'email'
                ],
                where: {
                    id: request.user.id,
                    email: request.user.email,
                    userDeletedAt: null
                }
            })
            if (userData) {
                return {
                    status: 'UserExist',
                    userExistStatus: false
                }
            } else {
                return {
                    status: 'NoUserExist',
                    userExistStatus: true
                };
            }
        } else {
            return {
                status: "notLoggedIn",
                userExistStatus: true
            };
        }
    }
};
export default getCheckUserStatus;