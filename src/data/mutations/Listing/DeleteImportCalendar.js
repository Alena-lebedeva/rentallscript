import ListCalendarType from '../../types/ListCalendarType';

import { ListCalendar, ListBlockedDates, Listing } from '../../models';

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const deleteCalendar = {

  type: ListCalendarType,

  args: {
    calendarId: { type: new NonNull(IntType) },
    listId: { type: new NonNull(IntType) },
  },

  async resolve({ request }, { calendarId, listId }) {

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id: listId };

      if (!request.user.admin) {
        where = {
          id: listId,
          userId: request.user.id
        };
      }

      const isListingAvailable = await Listing.find({ where });

      if (isListingAvailable) {
        const removeCal = await ListCalendar.destroy({
          where: { id: calendarId }
        });

        if (removeCal > 0) {
          const removeblockedDates = await ListBlockedDates.destroy({
            where: { listId, calendarId }
          });
          return {
            status: '200'
          };
        } else {
          return {
            status: '500'
          }
        }
      }

    } else {
      return {
        status: '403'
      };
    }
  },
};

export default deleteCalendar;


/**
mutation DeleteCalendar($listId: Int!, $calendarId: Int!) {
    deleteCalendar(listId: $listId, calendarId: $calendarId) {
        status
    }
}
 */
