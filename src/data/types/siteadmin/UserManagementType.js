import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
const Profile = new ObjectType({
  name: "Profile",
  description: "This represent user profile data",
  fields: () => ({
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
  })
});
const UserManagementType = new ObjectType({
  name: 'UserManagement',
  description: "This represent user data for admin management",
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    profile: {
      type: Profile
    },
    userBanStatus: { type: IntType },
    status: { type: StringType }
  },
});
export default UserManagementType;
