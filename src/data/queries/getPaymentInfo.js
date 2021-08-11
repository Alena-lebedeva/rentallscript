import PaymentType from '../types/PaymentType';
import { PaymentSettings } from '../../data/models';

import {
  GraphQLInt as IntType
} from 'graphql';

const getPaymentInfo = {

  type: PaymentType,

  args: {
    id: { type: IntType }
  },

  async resolve({ request }, { id }) {

    if (request.user) {

      return await PaymentSettings.find({
        where: {
          id: id
        }
      });

    } else {
      return {
        status: "failed"
      }
    }
  },
};

export default getPaymentInfo;