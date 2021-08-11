import ReservationType from '../../types/ReservationType';
import { Reservation } from '../../models';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

const updatePayoutForReservation = {

    type: ReservationType,

    args: {
        payoutId: { type: new NonNull(IntType) },
        reservationId: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { mode, payoutId, reservationId }) {
        if (request.user && !request.user.admin) {

            try {
                const hostId = request.user.id;

                const change = await Reservation.update({
                    payoutId
                }, {
                        where: {
                            hostId,
                            id: reservationId
                        }
                    });

                if (change) {
                    return {
                        status: 'success'
                    }
                } else {
                    return {
                        status: 'updateFailed'
                    }
                }

            } catch (error) {
                return {
                    status: error
                }
            }

        } else {
            return {
                status: 'notLoggedIn',
            };
        }
    }
};

export default updatePayoutForReservation;


/**
mutation updatePayoutForReservation(
  $payoutId: Int!,
  $reservationId: Int!
){
    updatePayoutForReservation(
      payoutId: $payoutId,
      reservationId: $reservationId
    ) {
        status
    }
}
**/