import DataType from 'sequelize';
import Model from '../sequelize';

const UserAmenities = Model.define('UserAmenities', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  amenitiesId: {
    type: DataType.INTEGER,
    allowNull: false
  }

});

export default UserAmenities;
