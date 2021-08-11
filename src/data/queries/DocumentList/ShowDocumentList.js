

// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType
} from 'graphql';

import DocumentVerificationType from '../../types/DocumentVerification';

import { DocumentVerification } from '../../../data/models';

const ShowDocumentList = {

  //type: DocumentVerificationType,
  type: new List(DocumentVerificationType),

  args: {
    userId: { type: StringType },
  },


  async resolve({ request, response }, { userId }) {

    if (request.user) {
      let userId = request.user.id;
      return await DocumentVerification.findAll({
        where: {
          userId
        }
      });
    }
  },
};

export default ShowDocumentList;


/*
query ShowDocumentList{
    ShowDocumentList{
        id
        userId,
        fileName,
        fileType
    }
}
*/