import UserEditProfile from '../types/userEditProfileType';
import { UserProfile } from '../../data/models';

import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';

const UploadProfilePicture = {

    type: UserEditProfile,

    args: {
        picture: {
            type: new NonNull(StringType)
        }
    },

    async resolve({ request }, { picture }) {

        if (request.user && request.user.admin != true) {
            await UserProfile.update({
                picture
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

export default UploadProfilePicture;