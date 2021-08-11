import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
} from 'graphql';

const LocationItemType = new ObjectType({
  name: 'LocationItem',
  fields: {
    address: { type: StringType },
    street: { type: StringType },
    country: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    status: { type: IntType}
  },
});

export default LocationItemType;
