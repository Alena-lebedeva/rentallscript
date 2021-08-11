import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

// Models
import { CancellationDetails, Reservation } from '../models';

// Types
import CancellationDetailsType from './CancellationDetailsType';
import ReservationTypeForThread from './ReservationTypeForThread';

const ThreadItemsType = new ObjectType({
    name: 'ThreadItems',
    fields: {
        id: {
            type: IntType
        },
        threadId: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        sentBy: {
            type: StringType
        },
        content: {
            type: StringType
        },
        type: {
            type: StringType
        },
        startDate: {
            type: StringType
        },
        endDate: {
            type: StringType
        },
        personCapacity: {
            type: IntType
        },
        isRead: {
            type: BooleanType
        },
        createdAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        userBanStatus: {
            type: IntType
        },
        cancelData: {
            type: CancellationDetailsType,
            resolve(threadItems) {
                return CancellationDetails.findOne({ where: { reservationId: threadItems.reservationId } });
            }
        },
        reservation: {
            type: ReservationTypeForThread,
            resolve(threadItems) {
                return Reservation.findOne({ where: { id: threadItems.reservationId } });
            }
        }
    }
});
export default ThreadItemsType;