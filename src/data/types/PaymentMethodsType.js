import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const PaymentMethodsType = new ObjectType({
    name: 'PaymentMethods',
    fields: {
        id: {
            type: IntType
        },
        name: {
            type: StringType
        },
        processedIn: {
            type: StringType
        },
        fees: {
            type: StringType
        },
        currency: {
            type: StringType
        },
        details: {
            type: StringType
        },
        isEnable: {
            type: BooleanType
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
        paymentType: {
            type: IntType
        }
    }
});

export default PaymentMethodsType;