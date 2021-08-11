import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLList as List,
} from 'graphql';

import moment from 'moment';

// Models
import {
    ReservationSpecialPricing
} from '../models';

// Type
import ReservationSpecialPricingType from './ReservationSpecialPricingType';

const ReservationTypeForThread = new ObjectType({
    name: 'ReservationThread',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },

        hostId: {
            type: StringType
        },
        guestId: {
            type: StringType
        },
        checkIn: {
            type: StringType
        },
        checkOut: {
            type: StringType
        },
        guests: {
            type: IntType
        },
        message: {
            type: StringType
        },
        basePrice: {
            type: FloatType
        },
        cleaningPrice: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        discount: {
            type: FloatType
        },
        discountType: {
            type: StringType
        },
        guestServiceFee: {
            type: FloatType,
        },
        hostServiceFee: {
            type: FloatType,
        },
        total: {
            type: FloatType,
        },
        confirmationCode: {
            type: IntType
        },
        reservationState: {
            type: StringType
        },
        paymentState: {
            type: StringType
        },
        payoutId: {
            type: IntType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        paymentMethodId: {
            type: IntType
        },
        bookingSpecialPricing: {
            type: new List(ReservationSpecialPricingType),
            async resolve(reservation) {
                let convertedResponse = [];
                const listingSpecialPricingData = await ReservationSpecialPricing.findAll({
                    where: {
                        reservationId: reservation.id
                    },
                    order: [['blockedDates', 'ASC']],
                    raw: true
                });

                if (listingSpecialPricingData && listingSpecialPricingData.length > 0) {
                    Promise.all(listingSpecialPricingData.map((item) => {
                        convertedResponse.push({
                            "id": item.id,
                            "listId": item.listId,
                            "reservationId": item.reservationId,
                            "blockedDates": moment(item.blockedDates).utc().format('MM/DD/YYYY'),
                            "isSpecialPrice": item.isSpecialPrice
                        });
                    }));

                    return await convertedResponse;
                } else {
                    return await [];
                }
            }
        },
    }
});

export default ReservationTypeForThread;