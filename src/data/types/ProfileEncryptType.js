import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
  } from 'graphql';
  
  import { User, UserVerifiedInfo, Reviews } from '../models';
  
  import UserEncryptType from './UserEncryptType';
  import UserVerifiedInfoType from './UserVerifiedInfoType';
  import ReviewsType from './ReviewsType';
  
  const ProfileEncryptType = new ObjectType({
    name: 'userProfileEncrypt',
    fields: {
      userId: {
        type: StringType,
      },
      userData: {
        type: UserEncryptType,
        resolve(profile) {
          return User.findOne({
            where: { id: profile.userId },
            raw: true
          });
        },
      },
      userVerification: {
        type: UserVerifiedInfoType,
        resolve(profile) {
          return UserVerifiedInfo.findOne({
            where: { userId: profile.userId },
          });
        },
      },
      reviewsCount: {
        type: IntType,
        async resolve(profile) {
          return await Reviews.count({
            where: {
              userId: profile.userId,
              isAdminEnable: true
            }
          });
        }
      },
      profileId: {
        type: IntType,
      },
      firstName: {
        type: StringType,
      },
      lastName: {
        type: StringType,
      },
      displayName: {
        type: StringType,
      },
      dateOfBirth: {
        type: StringType,
      },
      picture: {
        type: StringType,
      },
      location: {
        type: StringType,
      },
      phoneNumber: {
        type: StringType
      },
      info: {
        type: StringType,
      },
      createdAt: {
        type: StringType,
      },
    },
  });
  
  export default ProfileEncryptType;
  