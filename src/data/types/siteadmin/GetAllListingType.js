import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLList as List,
} from 'graphql';
import ShowListingType from '../../types/ShowListingType';
const GetAllListingType = new ObjectType({
  name: 'GetAllListingType',
  description: "This represent list data for admin management",
  fields: {
    usersData: {
      type: new List(ShowListingType),
    },
    count: {
      type: IntType
    }
  },
});
export default GetAllListingType;
