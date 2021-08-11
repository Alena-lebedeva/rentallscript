import {
  GraphQLList as List
} from 'graphql';

// Models
import { PopularLocation } from '../../models';

// Types
import PopularLocationType from '../../types/siteadmin/PopularLocationType';

const getPopularLocation = {

  type: new List(PopularLocationType),

  async resolve({ request }) {
    return await PopularLocation.findAll({
    });
  }
};

export default getPopularLocation;

/**

query getPopularLocation {
  getPopularLocation{
    id
    location
    locationAddress
    image
    isEnable
    createdAt
    updatedAt
  }
}

**/