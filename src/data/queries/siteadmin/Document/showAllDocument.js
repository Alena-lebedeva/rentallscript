
import sequelize from '../../../sequelize';


import UserDocumentListType from '../../../types/siteadmin/UserDocumentListType';
import { User } from '../../../../data/models';

import {
  GraphQLList as List
} from 'graphql';

const showAllDocument = {

  type: new List(UserDocumentListType),

  async resolve({ request, response }) {

    if (request.user && request.user.admin == true) {


      // Get All User Profile Data
      return await User.findAll({
        attributes: ['id', 'email'],
        where: {
          id: {
            $in: [
              sequelize.literal(`SELECT distinct userId FROM DocumentVerification `)
            ]
          }
        }
      });


    }
  },
};

export default showAllDocument;


/*

query showAllDocument
{
  showAllDocument {
    id,
    email,
     profile{
          firstName
    }

  }
}




*/