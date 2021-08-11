import DocumentVerificationType from '../../types/DocumentVerification';
import { DocumentVerification } from '../../../data/models';

import {
  GraphQLInt as IntType
} from 'graphql';

const RemoveDocumentList = {

  type: DocumentVerificationType,

  args: {
    id: { type: IntType },
  },

  async resolve({ request, response }, { id }) {

    // Check whether user is logged in
    if (request.user && !request.user.admin) {

      let userId = request.user.id;
      let where = {
        id,
        userId
      };

      const removePhoto = await DocumentVerification.destroy({ where });

      const photosCount = await DocumentVerification.count({ where: { userId } });
      return {
        status: "success",
        photosCount
      };
    }
    else {
      return {
        status: "Not loggedIn"
      };
    }

  },
};

export default RemoveDocumentList;
/*
mutation ($id:Int) {
  RemoveDocumentList (id: $id) {
    status
    photosCount
  }
}
*/