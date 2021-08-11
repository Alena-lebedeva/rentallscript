import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const UpdateUserType = new ObjectType({
  name: 'UpdateUser',
  fields: {
    profileId: { type: IntType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    status: { type: StringType }
  },
});

export default UpdateUserType;
