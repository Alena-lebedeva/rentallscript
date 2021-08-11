import DataType from 'sequelize';
import Model from '../sequelize';

const UserListingSteps = Model.define('UserListingSteps', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  step1: {
    type: DataType.ENUM('inactive', 'active', 'completed'),
    defaultValue: 'inactive',
  },

  step2: {
    type: DataType.ENUM('inactive', 'active', 'completed'),
    defaultValue: 'inactive',
  },

  step3: {
    type: DataType.ENUM('inactive', 'active', 'completed'),
    defaultValue: 'inactive',
  },

  step4: {
    type: DataType.ENUM('inactive', 'active', 'completed'),
    defaultValue: 'active',
  },

});

export default UserListingSteps;
