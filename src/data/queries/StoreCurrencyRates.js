
import {
  GraphQLString as StringType
} from 'graphql';

// Type
import CurrencyType from '../types/CurrencyType';

// Sequelize models
import { CurrencyRates } from '../../data/models';

const StoreCurrencyRates = {

  type: CurrencyType,

  args: {
    rates: { type: StringType },
    base: { type: StringType },
  },

  async resolve({ request, response }, { rates, base }) {

    const currencyData = JSON.parse(rates);

    let baseData = {
      currencyCode: base,
      rate: 1.00
    };
    let ratesData = Object.keys(currencyData).map(function (data) {
      return { "currencyCode": data, rate: currencyData[data] };
    });
    ratesData.push(baseData);
    if (ratesData.length > 0) {
      await CurrencyRates.truncate();
      const updateRates = await CurrencyRates.bulkCreate(ratesData);
      return {
        status: "success"
      }
    } else {
      return {
        status: "failed"
      }
    }
  },
};

export default StoreCurrencyRates;