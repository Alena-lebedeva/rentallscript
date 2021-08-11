import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const EditUserType = new ObjectType({
  name: 'EditUser',
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
    createdAt: { type: StringType }
  },
});

export default EditUserType;
