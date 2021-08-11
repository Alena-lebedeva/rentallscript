// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation, ListBlockedDates, Threads, UserProfile, Listing } from '../../models';
import { sendNotifications } from '../../../helpers/sendNotifications';

import { sendServerEmail } from '../../../core/email/sendServerEmail';

const updateReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) },
    actionType: { type: new NonNull(StringType) },
    threadId: { type: IntType }
  },

  async resolve({ request, response }, { reservationId, actionType, threadId }) {
    let isReservationUpdated = false, emailContent;
    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;
      let notifyUserId, notifyUserType, notifyContent;
      let userName, messageContent;

      const updateReservation = await Reservation.update({
        reservationState: actionType
      }, {
        where: {
          id: reservationId
        }
      }).then(function (instance) {
        // Check if any rows are affected
        if (instance > 0) {
          isReservationUpdated = true;
        }
      });

      const getThread = await Threads.findOne({
        attributes: ['host', 'guest', 'listId'],
        where: {
          id: threadId
        },
        raw: true
      });

      if (getThread && getThread.host && getThread.guest) {
        notifyUserId = getThread.host === userId ? getThread.guest : getThread.host;
        notifyUserType = getThread.host === userId ? 'guest' : 'host';
      }

      const hostProfile = await UserProfile.findOne({
        attributes: ['firstName'],
        where: {
          userId: getThread.host
        },
        raw: true
      });

      const guestProfile = await UserProfile.findOne({
        attributes: ['firstName'],
        where: {
          userId: getThread.host
        },
        raw: true
      });

      const listData = await Listing.findOne({
        attributes: ['title', 'city'],
        where: {
          id: getThread && getThread.listId
        },
        raw: true
      });

      const reservationData = await Reservation.findOne({
        attributes: ['checkIn', 'confirmationCode'],
        where: {
          id: reservationId
        },
        raw: true
      });

      if (hostProfile && getThread) {
        userName = hostProfile && hostProfile.firstName ? hostProfile.firstName : null;
      }

      if (actionType == 'approved') {
        messageContent = userName + ': ' + 'Booking is approved';

        notifyContent = {
          "screenType": "trips",
          "title": "Approved",
          "userType": notifyUserType.toString(),
          "message": messageContent.toString(),
        };
      } else {
        messageContent = userName + ' : ' + 'Booking is Declined';

        notifyContent = {
          "screenType": "trips",
          "title": "Declined",
          "userType": notifyUserType.toString(),
          "message": messageContent.toString(),
        };
      }

      if (actionType === 'declined') {

        // const unlockBlockedDates = await ListBlockedDates.update({
        //   reservationId: null,
        //   calendarStatus: 'available'
        // }, {
        //     where: {
        //       reservationId,
        //     }
        //   });

        const unlockBlockedDates = await ListBlockedDates.update({
          reservationId: null,
          calendarStatus: 'available'
        }, {
          where: {
            reservationId,
            calendarStatus: 'blocked',
            isSpecialPrice: {
              $ne: null
            }
          }
        });

        const unblockDatesWithOutPrice = await ListBlockedDates.destroy({
          where: {
            reservationId,
            calendarStatus: 'blocked',
            isSpecialPrice: {
              $eq: null
            }
          }
        });

      }

      if (isReservationUpdated) {
        sendNotifications(notifyContent, notifyUserId);

        // Email templates
        if (actionType === 'approved') {
          emailContent = {
            hostName: hostProfile && hostProfile.firstName,
            guestName: guestProfile && guestProfile.firstName,
            listTitle: listData && listData.title,
            listCity: listData && listData.city,
            threadId
          };
          await sendServerEmail(getThread.guest, 'bookingConfirmedToGuest', emailContent);
        } else if (actionType === 'declined') {
          emailContent = {
            hostName: hostProfile && hostProfile.firstName,
            guestName: guestProfile && guestProfile.firstName,
            checkIn: reservationData && reservationData.checkIn,
            confirmationCode: reservationData && reservationData.confirmationCode
          };
          await sendServerEmail(getThread.guest, 'bookingDeclinedToGuest', emailContent);
        }

        return {
          status: '200'
        }
      } else {
        return {
          status: '400'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default updateReservation;

/**
mutation updateReservation(
  $reservationId: Int!,
  $actionType: String!
){
    updateReservation(
      reservationId: $reservationId,
      actionType: $actionType
    ) {
        status
    }
}
**/
