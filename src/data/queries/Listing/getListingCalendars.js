// GrpahQL
import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ListCalendarType from '../../types/ListCalendarType';
import { ListCalendar, Listing } from '../../models';

const getListingCalendars = {

    type: new List(ListCalendarType),

    args: {
        listId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { listId }) {
        // Check if user already logged in

        if (request.user || request.user.admin) {

            let where = { id: listId };

            if (!request.user.admin) {
                where = {
                    id: listId,
                    userId: request.user.id
                };
            }

            // return await ListCalendar.findAll({
            //     where
            // });

            const isListingAvailable = await Listing.find({ where });

            if (isListingAvailable) {
                return await ListCalendar.findAll({
                    where: {
                        listId
                    }
                });
            } else {
                return {
                    status: '404'
                }
            }

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getListingCalendars;

/**
query GetCalendars($listId: Int!) {
  getListingCalendars(listId: $listId) {
    id
    name
    url
    status
  }
}
 */
