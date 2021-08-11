// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import PayoutType from '../../types/PayoutType';

// Sequelize models
import { Payout } from '../../models';

const removePayout = {

  type: PayoutType,

  args: {
    id: { type: new NonNull(IntType) },
  },

  async resolve({ request, response }, { id }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;

      let payoutRemoved = await Payout.destroy({
        where: {
          id,
          userId
        }
      });

      if (payoutRemoved) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'error in deleting a record'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default removePayout;

/**
mutation removePayout(
  $id: Int!,
){
    removePayout(
      id: $id
    ) {
        status
    }
}
**/
