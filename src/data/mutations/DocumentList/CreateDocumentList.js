import DocumentVerificationType from '../../types/DocumentVerification';

import { DocumentVerification } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const CreateDocumentList = {

  type: DocumentVerificationType,

  args: {
    userId: { type: new NonNull(IntType) },

    fileName: { type: StringType },
    fileType: { type: StringType },

  },

  async resolve({ request, response }, { userId, fileName, fileType }) {

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id: userId };
      if (!request.user.admin) {
        where = {
          id: userId,
          userId: request.user.id
        }
      };

      // Check whether listing is available
      //  const isListingAvailable = await Listing.findOne({ where });

      //if(isListingAvailable) {

      // Create a new record for a photo
      const createPhoto = await DocumentVerification.create({
        userId: userId,
        fileName: fileName,
        fileType: fileType
      });

      const photosCount = await DocumentVerification.count({ where: { userId } });
      //  const steps = await UserListingSteps.findOne({ where: { userId } });

      if (photosCount > 0) {
        const updateListingStatus = await DocumentVerification.update({
          isReady: true
        }, {
            where: { id: userId }
          });
      }

      return {
        status: "success",
        photosCount: photosCount
      };

      //   } else {
      //       return {
      //         status: "Listing is not available"
      //       };
      //   }

    } else {
      return {
        status: "Not loggedIn"
      };
    }

  },
};

export default CreateDocumentList;

/*
mutation  ($userId:String!, $fileName: String, $fileType: String) {
          CreateDocumentList (userId:$userId, fileName: $fileName, fileType: $fileType) {
            status
            photosCount
          }
        }
*/
