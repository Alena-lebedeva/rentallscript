import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
} from 'graphql';

const GetAddressComponentsType = new ObjectType({
  name: 'GetAddressComponents',
  fields: {
    addressComponents: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    geoType: { type: StringType },
    sw_lat: { type: FloatType },
    sw_lng: { type: FloatType },
    ne_lat: { type: FloatType },
    ne_lng: { type: FloatType },
  },
});

export default GetAddressComponentsType;
