import DataType from 'sequelize';
import Model from '../sequelize';

const UserHouseRules = Model.define('UserHouseRules', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  houseRulesId: {
    type: DataType.INTEGER,
    allowNull: false
  }

});

export default UserHouseRules;
