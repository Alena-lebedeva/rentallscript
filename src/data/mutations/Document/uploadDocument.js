// GrpahQL
import {
  GraphQLString as StringType
} from 'graphql';

import DocumentVerificationType from '../../types/DocumentVerification';

import { DocumentVerification } from '../../../data/models';

const uploadDocument = {

  type: DocumentVerificationType,

  args: {
    fileName: { type: StringType },
    fileType: { type: StringType },
  },

  async resolve({ request, response }, {

    fileName,
    fileType
  }) {


    if (request.user && !request.user.admin) {
      const uploadDocuments = await DocumentVerification.create({
        fileName,
        fileType,
        userId: request.user.id
      });
      if (uploadDocuments) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default uploadDocument;

/*


mutation uploadDocument(
 $fileName: String,$fileType: String,
){
    uploadDocument(
      fileName: $fileName,
      fileType: $fileType
    ) {
        fileName
        fileType

    }
}



*/

/**
mutation CreateThreadItems(
  $listId: Int!,
  $host: String!,
  $content: String!,
  $type: String,
  $startDate: String,
  $endDate: String,
  $personCapacity: Int
){
    CreateThreadItems(
      listId: $listId,
      host: $host,
      content: $content,
      type: $type,
      startDate: $startDate,
      endDate: $endDate,
      personCapacity: $personCapacity
    ) {
        id
        sentBy
        content
        type
        startDate
        endDate
        personCapacity
        createdAt
    }
}
**/
