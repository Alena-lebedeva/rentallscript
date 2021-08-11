import UserEditProfile from '../types/userEditProfileType';
import { UserProfile } from '../../data/models';

const RemoveProfilePicture = {

    type: UserEditProfile,

    async resolve({ request }) {

        if (request.user && request.user.admin != true) {
            await UserProfile.update({
                picture: null
            }, {
                    where: {
                        userId: request.user.id
                    }
                });

            return { status: 'success' }
        } else {
            return { status: 'notLoggedIn' }
        }
    }
};

export default RemoveProfilePicture;