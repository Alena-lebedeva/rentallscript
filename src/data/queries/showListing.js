import ShowListingType from '../types/ShowListingType';
import { Listing } from '../../data/models';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const showListing = {

  type: ShowListingType,

  args: {
    listId: { type: new NonNull(StringType) },
  },

  async resolve({ request }, { listId }) {

    // Get All Listing Data
    const listingData = await Listing.find({
      where: {
        id: listId
      },
    });

    return listingData;

  },
};

export default showListing;
