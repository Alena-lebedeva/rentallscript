import {
    GraphQLList as List
} from 'graphql';

// Models
import { PopularLocation } from '../../models';

import sequelize from '../../sequelize';

// Types
import PopularLocationType from '../../types/siteadmin/PopularLocationType';

const getPopularLocationAdmin = {

    type: new List(PopularLocationType),

    async resolve({ request }) {
        return await PopularLocation.findAll({
            where: {
                isEnable: true,
            },
            order: [[sequelize.literal('RAND()')]],
        });

    }
};

export default getPopularLocationAdmin;

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