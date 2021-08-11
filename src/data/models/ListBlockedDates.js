import DataType from 'sequelize';
import Model from '../sequelize';

const ListBlockedDates = Model.define('ListBlockedDates', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  reservationId: {
    type: DataType.INTEGER,
  },

  blockedDates: {
    type: DataType.DATE,
    allowNull: false,
  },

  calendarId: {
    type: DataType.INTEGER,
  },

  calendarStatus: {
    type: DataType.ENUM('available', 'blocked', 'reservation'),
  },

  isSpecialPrice: {
    type: DataType.INTEGER,
  }

});

export default ListBlockedDates;
