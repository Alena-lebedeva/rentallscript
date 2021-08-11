import EditUserType from '../../types/siteadmin/EditUserType';
import { UserProfile } from '../../../data/models';

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const editUser = {

  type: EditUserType,

  args: {
    profileId: { type: new NonNull(IntType) },
  },

  async resolve({ request }, { profileId }) {

    // Get All User Profile Data
    const userData = await UserProfile.find({
      attributes: [
        'profileId',
        'firstName',
        'lastName',
        'dateOfBirth',
        'gender',
        'phoneNumber',
        'preferredLanguage',
        'preferredCurrency',
        'location',
        'info',
        'createdAt'
      ],
      where: {
        profileId: profileId
      }
    });

    return userData;

  },
};

export default editUser;
