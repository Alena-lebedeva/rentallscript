import CurrenciesType from '../types/CurrenciesType';
import { Currencies } from '../../data/models';

import {
  GraphQLList as List
} from 'graphql';

const getCurrencies = {

  type: new List(CurrenciesType),

  async resolve({ request }) {

    return await Currencies.findAll({
      order: [
        ['isBaseCurrency', 'DESC'],
      ]
    });

  },
};

export default getCurrencies;
