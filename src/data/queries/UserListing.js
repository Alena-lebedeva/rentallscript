import ShowListingType from '../types/ShowListingType';
import {
  Listing
} from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const UserListing = {

  type: ShowListingType,

  args: {
    listId: { type: new NonNull(StringType) },
    preview: { type: BooleanType },
  },

  async resolve({ request }, { listId, preview }) {
    let where;
    if (request.user && preview) {
      if (!request.user.admin) {
        const userId = request.user.id;
        where = {
          id: listId,
          userId
        };
      } else {
        where = {
          id: listId
        };
      }
    } else {
      where = {
        id: listId,
        isPublished: true,
      };
    }

    const listingData = await Listing.find({
      where
    });

    return listingData;

  },
};

export default UserListing;
