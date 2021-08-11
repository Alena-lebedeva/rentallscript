import DataType from 'sequelize';
import Model from '../sequelize';

const ReservationSpecialPricing = Model.define('ReservationSpecialPricing', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  listId: {
    type: DataType.INTEGER,
  },
  reservationId: {
    type: DataType.INTEGER,
  },
  blockedDates: {
    type: DataType.DATE,
    allowNull: false
  },
  isSpecialPrice: {
    type: DataType.FLOAT
  }

});

export default ReservationSpecialPricing;
