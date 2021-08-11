import CurrencyType from '../types/CurrencyType';

// Sequelize models
import { CurrencyRates, Currencies } from '../../data/models';

const Currency = {

  type:  CurrencyType,

  async resolve({ request, response }) {
    var rates, ratesData = {};
    const data = await CurrencyRates.findAll();
    const base = await Currencies.findOne({ where: { isBaseCurrency: true } });
    if(data){
      data.map((item) => {
        ratesData[item.dataValues.currencyCode] = item.dataValues.rate;
      })
    }
    rates = JSON.stringify(ratesData);
    return {
      base: base.symbol,
      rates
    };
  },
};

export default Currency;