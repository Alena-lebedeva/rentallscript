import ReservationType from '../../types/ReservationType';
import { Reservation } from '../../models';

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const viewReservationAdmin = {

  type: ReservationType,
  args: {
    id: { type: new NonNull(IntType) }

  },
  async resolve({ request }, { id }) {
    if (request.user.admin) {
      let paymentState = 'completed';

      return await Reservation.findOne({
        where: {
          paymentState,
          id: id
        },
        order: [['createdAt', 'DESC']]
      });
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default viewReservationAdmin;

/**

query getAllReservationAdmin{
  getAllReservationAdmin{
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
        total
    messageData {
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
    status
  }
}

**/