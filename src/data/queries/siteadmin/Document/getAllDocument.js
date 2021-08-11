import DocumentVerificationType from '../../../types/DocumentVerification';

//Database Models
import { DocumentVerification } from '../../../../data/models';

import {
  GraphQLList as List
} from 'graphql';

const getAllDocument = {

  type: new List(DocumentVerificationType),

  async resolve({ request }) {

    if (request.user && request.user.admin == true) {

      const getDocument = await DocumentVerification.findAll({

      });
      return getDocument;

    } else {
      return {
        status: 'failed'
      }
    }
  },
};

export default getAllDocument;

/*

query getAllDocument{
  getAllDocument {
    id,
    userId,
    fileName,
    fileType,
    documentStatus,
    user{
      id,
      email
       profile {
                firstName,
        				lastName
            }
      }

  }
}



*/