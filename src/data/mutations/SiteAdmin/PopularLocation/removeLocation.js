import PopularLocationType from '../../../types/siteadmin/PopularLocationType';
import { PopularLocation } from '../../../models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const removeLocation = {

  type: PopularLocationType,

  args: {
    id: { type: IntType },
    image: { type: StringType },
  },

  async resolve({ request }, { id, image }) {

    if (request.user && request.user.admin == true) {
      let updateLocation = await PopularLocation.update({
        image: null
      }, {
          where: {
            id: id
          }
        });

      if (updateLocation) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }

    } else {
      return {
        status: 'not logged in'
      }
    }

  },
};

export default removeLocation;
