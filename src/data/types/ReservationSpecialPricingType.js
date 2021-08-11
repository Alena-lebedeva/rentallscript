import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
} from 'graphql';

const ReservationSpecialPricingType = new ObjectType({
    name: 'ReservationSpecialPricingType',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        blockedDates: {
            type: StringType
        },
        isSpecialPrice: {
            type: FloatType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export default ReservationSpecialPricingType;