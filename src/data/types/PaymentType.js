import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const PaymentType = new ObjectType({
  name: 'PaymentType',
  fields: {
    id: { type: IntType },
    paymentName: { type: StringType },
    paymentStatus: { type: StringType },
    paymentMode: { type: StringType },
    email: { type: StringType },
    APIUserId: { type: StringType },
    APIPassword: { type: StringType },
    APISecret: { type: StringType },
    AppId: { type: StringType },
    status: { type: StringType }
  },
});

export default PaymentType;