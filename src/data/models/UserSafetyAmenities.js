import DataType from 'sequelize';
import Model from '../sequelize';

const UserSafetyAmenities = Model.define('UserSafetyAmenities', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  safetyAmenitiesId: {
    type: DataType.INTEGER,
    allowNull: false
  }

});

export default UserSafetyAmenities;
