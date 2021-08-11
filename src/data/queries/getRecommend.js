import ShowListingType from '../types/ShowListingType';
import { Listing, Recommend } from '../../data/models';

import {
  GraphQLList as List
} from 'graphql';

const getRecommend = {

  type: new List(ShowListingType),

  async resolve({ request }) {

    // Get Recommended Listings
    return await Listing.findAll({
      where: {
        isPublished: true
      },
      include: [
        { model: Recommend, as: "recommend", required: true },
      ]
    });

  },
};

export default getRecommend;
