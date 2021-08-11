import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
} from 'graphql';
import { UserProfile, DocumentVerification, UserVerifiedInfo } from '../../models';



//User Profile
const UserProfileType = new ObjectType({
  name: 'UserProfileDocument',
  fields: {
    firstName: {
      type: StringType,
      resolve(profile) {
        return profile.firstName;
      }
    },


  }
});


const UserVerifiedInfoType = new ObjectType({
  name: 'UserVerifiedInfoType',
  fields: {
    isIdVerification: {
      type: BooleanType,
      resolve(verification) {
        return verification.isIdVerification;
      }
    },
  }
});


//Document Verification
const DocumentType = new ObjectType({
  name: 'DocumentType',
  fields: {
    fileName: {
      type: StringType
    },
    fileType: {
      type: StringType
    },
    documentStatus: {
      type: StringType
    },
  }
});



const UserDocumentListType = new ObjectType({
  name: 'UserDocumentListType',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    type: { type: StringType },
    profile: {
      type: UserProfileType,
      async resolve(documentlist) {
        return await UserProfile.findOne({
          where: {
            userId: documentlist.id
          }
        })
      }
    },
    document: {
      type: new List(DocumentType),
      async resolve(documentlist) {
        return await DocumentVerification.findAll({
          where: {
            userId: documentlist.id
          }
        })
      }
    },
    verification: {
      type: UserVerifiedInfoType,
      async resolve(documentlist) {
        return await UserVerifiedInfo.findOne({
          where: {
            userId: documentlist.id
          }
        })
      }
    },
  },
});

export default UserDocumentListType;

