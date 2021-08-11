import DataType from 'sequelize';
import Model from '../sequelize';

const PaymentSettings = Model.define('PaymentSettings', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  paymentName: {
    type: DataType.STRING,
    allowNull: false,
  },

  paymentStatus: {
    type: DataType.ENUM('true', 'false'),
    defaultValue: 'false',
  },

  paymentMode: {
    type: DataType.ENUM('live', 'sandbox'),
    defaultValue: 'sandbox',
  },

  email: {
    type: DataType.STRING,
    validate: { isEmail: true },
  },

  APIUserId: {
    type: DataType.STRING,
  },

  APIPassword: {
    type: DataType.STRING,
  },

  APISecret: {
    type: DataType.STRING,
  },

  AppId: {
    type: DataType.STRING,
  }

});

export default PaymentSettings;