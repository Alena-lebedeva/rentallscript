import ListViewsType from '../types/ListViewsType';
import { ListViews } from '../../data/models';

import {
  GraphQLInt as IntType
} from 'graphql';

const UpdateListViews = {

  type: ListViewsType,

  args: {
    listId: { type: IntType },
  },

  async resolve({ request }, { listId }) {
    if (request.user && request.user.admin != true) {
      const userId = request.user.id;
      const getViews = await ListViews.findAll({
        where: {
          listId,
          userId,
          createdAt: {
            $lte: new Date(),
            $gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      });

      const viewsCount = Object.keys(getViews).length;

      if (viewsCount === 0) {
        const createNewRecord = await ListViews.create({
          listId,
          userId,
        });
        return { status: 'success' };
      }
      return { status: '400' };
    }
    return { status: 'notLoggedIn' };
  },
};

export default UpdateListViews;
