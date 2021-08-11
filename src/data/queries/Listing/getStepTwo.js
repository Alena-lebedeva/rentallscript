import ShowListingType from '../../types/ShowListingType';
import {
  Listing
} from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

const getStepTwo = {

  type: ShowListingType,

  args: {
    listId: { type: new NonNull(StringType) }
  },

  async resolve({ request }, { listId }) {
    let where;
    if (request.user) {
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
        id: listId
      };
    }

    const listingData = await Listing.find({
      where
    });

    return listingData;

  },
};

export default getStepTwo;
