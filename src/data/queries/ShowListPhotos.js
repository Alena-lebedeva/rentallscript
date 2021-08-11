import ListPhotosType from '../types/ListPhotosType';
import { ListPhotos, Listing } from '../../data/models';

import {
  GraphQLList as List,
  GraphQLInt as IntType,
} from 'graphql';

const ShowListPhotos = {

  type: new List(ListPhotosType),

  args: {
    listId: { type: IntType },
  },

  async resolve({ request, response }, { listId }) {

    if (request.user || request.user.admin) {
      let where = { listId };
      let listWhere = { id: listId };
      if (!request.user.admin) {
        listWhere = {
          id: listId,
          userId: request.user.id
        }
      };
      return await ListPhotos.findAll({
        where: { listId },
        include: [
          { model: Listing, as: 'listing', where: listWhere }
        ]
      });
    }
  },
};

export default ShowListPhotos;
