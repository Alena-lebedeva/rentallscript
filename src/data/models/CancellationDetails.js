import DataType from 'sequelize';
import Model from '../sequelize';

const CancellationDetails = Model.define('CancellationDetails', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  reservationId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  cancellationPolicy: {
    type: DataType.STRING,
    allowNull: false,
  },

  refundToGuest: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  payoutToHost: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  guestServiceFee: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  hostServiceFee: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  total: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  currency: {
    type: DataType.STRING,
    allowNull: false,
  },

  cancelledBy: {
    type: DataType.ENUM('host', 'guest'),
  }

});

export default CancellationDetails;