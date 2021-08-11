import ReservationType from '../../types/ReservationType';
import { ListBlockedDates } from '../../models';
import moment from 'moment';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const checkReservation = {

    // type:  new List(ReservationType),
    type: ReservationType,

    args: {
        checkIn: { type: StringType },
        checkOut: { type: StringType },
        listId: { type: IntType }
    },

    async resolve({ request }, { checkIn, checkOut, listId }) {
        if (request.user) {

            const checkAvailableDates = await ListBlockedDates.findAll({
                where: {
                    listId,
                    blockedDates: {
                        $between: [moment(checkIn).format('YYYY-MM-DD HH:MM:SS'), moment(checkOut).format('YYYY-MM-DD HH:MM:SS')]
                    },
                    calendarStatus: {
                        $notIn: ['available']
                    }
                }
            });

            if (checkAvailableDates && checkAvailableDates.length > 0) {
                return {
                    status: "400",
                };
            }
            else {
                return {
                    status: "200",
                };
            }
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default checkReservation;