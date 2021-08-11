import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';


import { User } from '../models';

import { UserProfile } from '../models';

const ProfileType = new ObjectType({
  name: 'ProfileDocument',
  fields: {
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
    info: {
      type: StringType,
    },
    createdAt: {
      type: StringType,
    }
  }
});




const UserType = new ObjectType({
  name: 'UserDocument',
  fields: {

    id: {
      type: StringType,
      resolve(user) {
        return user.id;
      }
    },
    email: {
      type: StringType,
      resolve(user) {
        return user.email;
      }
    },
    profile: {
      type: ProfileType,
      async resolve(documentlist1) {
        return await UserProfile.findOne({
          where: {
            userId: documentlist1.id
          }
        })
      }
    },

  }
});



const DocumentVerificationType = new ObjectType({
  name: 'DocumentVerification',
  fields: {
    id: { type: IntType },
    userId: { type: new NonNull(ID) },
    fileName: { type: StringType },
    fileType: { type: StringType },
    photosCount: { type: IntType },
    user: {
      type: UserType,
      async resolve(documentlist) {
        return await User.findOne({
          where: {
            id: documentlist.userId
          }
        })
      }
    },
    documentStatus: { type: StringType },

    status: { type: StringType },
  },
});

export default DocumentVerificationType;
