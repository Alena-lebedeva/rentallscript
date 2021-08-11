import AllReservationType from '../../types/AllReservationType';
import { Reservation } from '../../models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const getAllReservation = {

  type: AllReservationType,

  args: {
    userType: { type: StringType },
    currentPage: { type: IntType },
    dateFilter: { type: StringType }
  },

  async resolve({ request }, { userType, currentPage, dateFilter }) {
    const limit = 5;
    let offset = 0;
    // Offset from Current Page
    if (currentPage) {
      offset = (currentPage - 1) * limit;
    }
    if (request.user && !request.user.admin) {
      const userId = request.user.id;
      let where;
      let order;
      let paymentState = 'completed';
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      let tripFilter = {
        $gte: today
      };

      if (dateFilter == 'previous') {
        tripFilter = {
          $lt: today
        }
      }

      if (userType === 'host') {
        where = {
          hostId: userId,
          paymentState,
          checkOut: tripFilter
        };
      } else {
        where = {
          guestId: userId,
          paymentState,
          checkOut: tripFilter
        };
      }
      
      if (dateFilter == 'previous') {
        order = [['checkIn', 'DESC']]
      } else {
        order = [['checkIn', 'ASC']]
      }

      const count = await Reservation.count({ where });
      const reservationData = await Reservation.findAll({
        where,
        order,
        limit: limit,
        offset: offset,
        raw: true
      });

      return {
        reservationData,
        count,
        currentPage
      };

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default getAllReservation;

/**

query getAllReservation ($userType: String){
  getAllReservation(userType: $userType){
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
        total
    message {
      id
    }
    listData {
      id
      title
      street
      city
      state
      country
    }
    hostData {
      profileId
      displayName
      picture
    }
    guestData {
      profileId
      displayName
      picture
    }
  }
}

**/