import CurrenciesType from '../types/CurrenciesType';
import { Currencies } from '../../data/models';

const getBaseCurrency = {

  type: CurrenciesType,

  async resolve({ request }) {

    return await Currencies.find({
      where: {
        isBaseCurrency: true
      }
    });

  },
};

export default getBaseCurrency;
