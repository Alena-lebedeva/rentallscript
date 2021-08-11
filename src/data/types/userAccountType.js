import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UserVerifiedInfoType from './UserVerifiedInfoType';
import UserType from './UserType';
import { encode } from '../../helpers/queryEncryption';
import { UserVerifiedInfo, User } from '../models';
const UserAccountType = new ObjectType({
  name: 'UserAccount',
  fields: {
    userId: { type: new NonNull(ID) },
    profileId: { type: new NonNull(IntType) },
    firstName: { type: StringType },
    lastName: { type: StringType },
    displayName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    email: { 
      type: StringType,
      resolve(user) {
        return user && user.email ? encode(user.email) : null;
      }
    },
    userBanStatus: { type: IntType },
    phoneNumber: {
      type: StringType,
      resolve(user) {
        return user && user.phoneNumber ? encode(user.phoneNumber) : null;
      }
    },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    createdAt: { type: StringType },
    status: { type: StringType },
    picture: { type: StringType },
    verification: {
      type: UserVerifiedInfoType,
      async resolve(userProfile) {
        return await UserVerifiedInfo.findOne({ where: { userId: userProfile.userId } });
      }
    },
    userData: {
      type: UserType,
      async resolve(userProfile) {
        return await User.findOne({ where: { id: userProfile.userId } });
      }
    },
    country: { type: IntType },
    verificationCode: { type: IntType },
    countryCode: { type: StringType },
    countryName: { type: StringType }
  },
});
export default UserAccountType;
