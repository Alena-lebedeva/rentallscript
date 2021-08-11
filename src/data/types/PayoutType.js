import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

import {PaymentMethods} from '../models';
import PaymentMethodsType from './PaymentMethodsType';

const PayoutType = new ObjectType({
    name: 'Payout',
    fields: {
        id: {
            type: IntType
        },
        methodId: {
            type: IntType
        },
        paymentMethod: {
            type: PaymentMethodsType,
            resolve (payout) {
                return PaymentMethods.findOne({ where: { id: payout.methodId } });
            }
        },
        userId: {
            type: StringType
        },
        payEmail: {
            type: StringType
        },
        address1: {
            type: StringType
        },
        address2: {
            type: StringType
        },
        city: {
            type: StringType
        },
        state: {
            type: StringType
        },
        zipcode: {
            type: StringType
        },
        country: {
            type: StringType
        },
        currency: {
            type: StringType
        },
        default: {
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
        last4Digits: {
            type: IntType
        },
        isVerified: {
            type: BooleanType
        }
    }
});

export default PayoutType;