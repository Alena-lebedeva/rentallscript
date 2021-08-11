import DataType from 'sequelize';
import Model from '../sequelize';

const SearchSettings = Model.define('SearchSettings', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  minPrice: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  maxPrice: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  priceRangeCurrency: {
    type: DataType.STRING,
    allowNull: false,
  }

});

export default SearchSettings;