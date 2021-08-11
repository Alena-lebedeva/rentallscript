import UserType from '../types/UserType';
import { User } from '../../data/models';
const getUserBanStatus = {
    type: UserType,
    async resolve({ request }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {
            const userData = await User.findOne({
                attributes: [
                    'userBanStatus'
                ],
                where: { id: request.user.id }
            })
            if (userData) {
                if (userData.userBanStatus == 1) {
                    return {
                        status: 'userbanned',
                        userBanStatus: true
                    }
                }
                else {
                    return {
                        status: 'userUnbanned',
                        userBanStatus: false
                    };
                }
            }
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};
export default getUserBanStatus;