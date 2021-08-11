import ReservationType from '../types/ReservationType';
import { Reservation, Threads, ThreadItems } from '../models';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';


const getUpcomingBookings = {


    type: ReservationType,


    args: {
        listId: { type: new NonNull(IntType) },
    },


    async resolve({ request }, { listId }) {


        if (request.user) {
            const userId = request.user.id;
            let where, date = new Date();
            let checkIn = { $gt: date };
            let instantBook = 'intantBooking';

            const getReservation = await Reservation.count({
                where: {
                    listId,
                    paymentState: 'completed',
                    $or: [
                        {

                            reservationState: 'approved'
                        },
                        {
                            reservationState: 'pending'
                        }
                    ],
                },
            });


            return {
                count: getReservation
            }


        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};


export default getUpcomingBookings;




/**


query getUpcomingBookings ($listId: Int!){
  getUpcomingBookings(listId: $listId){
    count
  }
}


**/