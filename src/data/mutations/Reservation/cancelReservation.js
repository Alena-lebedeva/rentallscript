// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import {
  Reservation,
  ListBlockedDates,
  CancellationDetails,
  ThreadItems,
  Threads,
  UserProfile,
  Listing
} from '../../models';
import { sendNotifications } from '../../../helpers/sendNotifications';
import { sendServerEmail } from '../../../core/email/sendServerEmail';

const cancelReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) },
    cancellationPolicy: { type: new NonNull(StringType) },
    refundToGuest: { type: new NonNull(FloatType) },
    payoutToHost: { type: new NonNull(FloatType) },
    guestServiceFee: { type: new NonNull(FloatType) },
    hostServiceFee: { type: new NonNull(FloatType) },
    total: { type: new NonNull(FloatType) },
    currency: { type: new NonNull(StringType) },
    threadId: { type: new NonNull(IntType) },
    cancelledBy: { type: new NonNull(StringType) },
    message: { type: new NonNull(StringType) },
    checkIn: { type: new NonNull(StringType) },
    checkOut: { type: new NonNull(StringType) },
    guests: { type: new NonNull(IntType) },
  },

  async resolve({ request, response }, {
    reservationId,
    cancellationPolicy,
    refundToGuest,
    payoutToHost,
    guestServiceFee,
    hostServiceFee,
    total,
    currency,
    threadId,
    userId,
    cancelledBy,
    message,
    checkIn,
    checkOut,
    guests
  }) {
    let isReservationUpdated = false, emailContent;
    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;

      let notifyUserId, notifyUserType, notifyContent;
      let userName, messageContent;

      const getThread = await Threads.findOne({
        attributes: ['host', 'guest'],
        where: {
          id: threadId
        },
        raw: true
      });

      const reservationData = await Reservation.findOne({
        attributes: ['id', 'confirmationCode', 'checkIn', 'listId'],
        where: {
          id: reservationId
        },
        raw: true
      });

      const listData = await Listing.findOne({
        attributes: ['title'],
        where: {
          id: reservationData && reservationData.listId
        }
      })

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
          userId: getThread.guest
        },
        raw: true
      });

      if (hostProfile && guestProfile && getThread) {
        userName = getThread.host === userId ? (hostProfile && hostProfile.firstName) : (guestProfile && guestProfile.firstName);
      }

      const count = await Reservation.count({
        where: {
          id: reservationId,
          reservationState: 'cancelled'
        }
      });

      if (count > 0) {
        return {
          status: '400'
        };
      }

      // Update Reservation table
      const updateReservation = await Reservation.update({
        reservationState: 'cancelled'
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

      // Unblock the blocked dates only if guest cancels the reservation
      if (cancelledBy === 'guest') {
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

      // Create record for cancellation details
      const cancellation = CancellationDetails.create({
        reservationId,
        cancellationPolicy,
        refundToGuest,
        payoutToHost,
        guestServiceFee,
        hostServiceFee,
        total,
        currency,
        cancelledBy
      });

      // Create thread items
      const thread = ThreadItems.create({
        threadId,
        reservationId,
        sentBy: userId,
        content: message,
        type: cancelledBy === 'host' ? 'cancelledByHost' : 'cancelledByGuest',
        startDate: checkIn,
        endDate: checkOut,
        personCapacity: guests
      });

      messageContent = userName + ': ' + message;

      notifyContent = {
        "screenType": "trips",
        "title": 'Booking is Cancelled',
        "userType": notifyUserType.toString(),
        "message": messageContent.toString()
      };

      if (isReservationUpdated) {
        sendNotifications(notifyContent, notifyUserId);

        emailContent = {
          hostName: hostProfile && hostProfile.firstName,
          guestName: guestProfile && guestProfile.firstName,
          confirmationCode: reservationData && reservationData.confirmationCode,
          checkIn: reservationData && reservationData.checkIn,
          listTitle: listData && listData.title,
          payoutToHost,
          refundToGuest,
          currency
        };

        if (cancelledBy === 'host') { // Email
          await sendServerEmail(getThread.guest, 'cancelledByHost', emailContent);
        } else {
          await sendServerEmail(getThread.host, 'cancelledByGuest', emailContent);
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

export default cancelReservation;

/**
mutation cancelReservation(
  $reservationId: Int!,
  $cancellationPolicy: String!,
  $refundToGuest: Float!,
  $payoutToHost: Float!,
  $guestServiceFee: Float!,
  $hostServiceFee: Float!,
  $total: FloatType!,
  $currency: String!,
  $threadId: Int!,
  $cancelledBy: String!,
  $message: String!
){
    cancelReservation(
      reservationId: $reservationId,
      cancellationPolicy: $cancellationPolicy,
      refundToGuest: $refundToGuest,
      payoutToHost: $payoutToHost,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      currency: $currency,
      threadId: $threadId,
      cancelledBy: $cancelledBy,
      message: $message
    ) {
        status
    }
}
**/
