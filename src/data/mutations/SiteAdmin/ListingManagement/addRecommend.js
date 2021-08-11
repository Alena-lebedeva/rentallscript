import RecommendType from '../../../types/RecommendType';
import { Recommend } from '../../../models';

import {
  GraphQLInt as IntType
} from 'graphql';

const addRecommend = {

  type: RecommendType,

  args: {
    listId: { type: IntType }
  },

  async resolve({ request }, { listId }) {

    if (request.user && request.user.admin == true) {

      const insertRecommend = await Recommend.create({
        listId
      });

      if (insertRecommend) {
        return {
          status: 'success'
        };
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

export default addRecommend;
