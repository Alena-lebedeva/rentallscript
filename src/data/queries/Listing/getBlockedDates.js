// GrpahQL
import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import ListBlockedDatesType from '../../types/ListBlockedDatesType';
import { ListBlockedDates } from '../../models';

const getBlockedDates = {

    type: new List(ListBlockedDatesType),

    args: {
        listId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { listId }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            return await ListBlockedDates.findAll({
                where: { listId }
            });

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getBlockedDates;

/**
query GetBlockedDates($listId: Int!) {
  getBlockedDates(listId: $listId) {
    id
    listId
    reservationId
    calendarId
    blockedDates
    status
  }
}
 */