// GrpahQL
import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import PayoutType from '../../types/PayoutType';

// Sequelize models
import { Payout } from '../../models';

const setDefaultPayout = {

  type: PayoutType,

  args: {
    id: { type: new NonNull(IntType) },
  },

  async resolve({ request, response }, { id }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;

      let changeEverything = await Payout.update({
        default: false
      },
        {
          where: {
            userId
          }
        });

      let payoutupdated = await Payout.update({
        default: true
      },
        {
          where: {
            id,
            userId
          }
        });

      if (payoutupdated) {
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

export default setDefaultPayout;

/**
mutation setDefaultPayout(
  $id: Int!,
){
    setDefaultPayout(
      id: $id
    ) {
        status
    }
}
**/
