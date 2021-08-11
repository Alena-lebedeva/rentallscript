import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const CurrencyType = new ObjectType({
  name: 'Currency',
  fields: {
    base: { type: StringType },
    date: { type: StringType },
    rates: { type: StringType },
    status: { type: StringType },
  },
});

export default CurrencyType;
