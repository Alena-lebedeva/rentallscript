import DataType from 'sequelize';
import Model from '../sequelize';

const UserSpaces = Model.define('UserSpaces', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  spacesId: {
    type: DataType.INTEGER,
    allowNull: false
  }

});

export default UserSpaces;
