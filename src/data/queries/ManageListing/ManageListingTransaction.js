import ShowListingType from '../../types/ShowListingType';

import { Listing } from '../../../data/models';

import {
    GraphQLList as List,
    GraphQLBoolean as BooleanType
} from 'graphql';

const ManageListingTransaction = {

    type: new List(ShowListingType),

    args: {
        isReady: { type: BooleanType }
    },

    async resolve({ request }) {

        if (request.user && request.user.admin != true) {

            const listingData = await Listing.findAll({
                where: {
                    userId: request.user.id,
                    isReady: true
                },
                order: 'createdAt DESC'
            });

            return listingData;

        } else {
            return {
                status: "notLoggedIn"
            }
        }

    },
};

export default ManageListingTransaction;
