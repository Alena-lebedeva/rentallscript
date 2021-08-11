// GrpahQL
import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ListBlockedDatesType from '../../types/ListBlockedDatesType';
import { ListBlockedDates } from '../../models';

const getListAvailableDates = {

    type: new List(ListBlockedDatesType),

    args: {
        listId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { listId }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            return await ListBlockedDates.findAll({
                where: {
                    listId,
                    calendarStatus: 'available'
                }
            });

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getListAvailableDates;

/**
query getListAvailableDates($listId: Int!) {
  getListAvailableDates(listId: $listId) {
    id
    listId
    reservationId
    calendarId
    blockedDates
    status
  }
}
 */