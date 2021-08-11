import ShowListingType from '../types/ShowListingType';
import { ListViews, Listing } from '../../data/models';
import sequelize from '../sequelize';

import {
    GraphQLList as List
} from 'graphql';

const GetMostViewedListing = {

    type: new List(ShowListingType),

    async resolve({ request }) {

        return await Listing.findAll({
            where: {
                isPublished: true
            },
            include: [
                {
                    model: ListViews,
                    attributes: [],
                    as: 'listViews',
                    required: true,
                    duplicating: false
                }
            ],
            order: [
                [sequelize.fn('count', sequelize.col('listViews.listId')), 'DESC'],
            ],
            group: ['listViews.listId'],
            limit: 10,
            offset: 0
        });

    }
};

export default GetMostViewedListing;