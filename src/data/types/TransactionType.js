import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
} from 'graphql';

const TransactionType = new ObjectType({
    name: 'TransactionType',
    fields: {
        id: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        payerEmail: {
            type: StringType
        },
        payerId: {
            type: StringType
        },
        receiverEmail: {
            type: StringType
        },
        receiverId: {
            type: StringType
        },
        transactionId: {
            type: StringType
        },
        total: {
            type: FloatType
        },
        transactionFee: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        ipn_track_id: {
            type: StringType
        },
        paymentType: {
            type: StringType
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
        }
    }
});

export default TransactionType;