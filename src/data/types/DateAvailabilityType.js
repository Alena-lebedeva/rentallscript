import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const DateAvailabilityType = new ObjectType({
  name: 'DateAvailability',
  fields: {
    listId: { type: new NonNull(IntType) },
    startDate: { type: new NonNull(StringType) },
    endDate: { type: new NonNull(StringType) },
    status: { type: StringType },
  },
});

export default DateAvailabilityType;
