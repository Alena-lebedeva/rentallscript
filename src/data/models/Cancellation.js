import DataType from 'sequelize';
import Model from '../sequelize';

const Cancellation = Model.define('Cancellation', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  policyName: {
    type: DataType.STRING,
    allowNull: false,
  },

  policyContent: {
    type: DataType.TEXT,
  },

  priorDays: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  accommodationPriorCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  accommodationBeforeCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  accommodationDuringCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  guestFeePriorCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  guestFeeBeforeCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  guestFeeDuringCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  hostFeePriorCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  hostFeeBeforeCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  hostFeeDuringCheckIn: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  isEnable: {
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  }

});

export default Cancellation;