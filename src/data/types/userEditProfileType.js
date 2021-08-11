import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType
} from 'graphql';

const UserEditProfile = new ObjectType({
  name: 'userEditProfile',
  fields: {
    firstName: { type: StringType },
    lastName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    email: { type: new NonNull(StringType) },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    status: {type: StringType},
    country: { type: IntType },
    verificationCode: { type: IntType },
    countryName: { type: StringType },
    countryCode: { type: StringType },
  },
});

export default UserEditProfile;
