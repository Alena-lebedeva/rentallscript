import RecommendType from '../../../types/RecommendType';
import { Recommend } from '../../../models';

import {
  GraphQLInt as IntType
} from 'graphql';

const removeRecommend = {

  type: RecommendType,

  args: {
    listId: { type: IntType }
  },

  async resolve({ request }, { listId }) {

    if (request.user && request.user.admin == true) {

      const deleteRecommend = await Recommend.destroy({
        where: {
          listId
        }
      });

      if (deleteRecommend) {
        return {
          listId,
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }
    } else {
      return {
        status: 'not logged in'
      }
    }
  },
};

export default removeRecommend;
