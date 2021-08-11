import DataType from 'sequelize';
import Model from '../sequelize';

const Transaction = Model.define('Transaction', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    reservationId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    payerEmail: {
        type: DataType.STRING,
        allowNull: true
    },

    payerId: {
        type: DataType.STRING,
        allowNull: true
    },

    receiverEmail: {
        type: DataType.STRING,
        allowNull: true,
    },

    receiverId: {
        type: DataType.STRING,
        allowNull: true,
    },

    transactionId: {
        type: DataType.STRING,
        defaultValue: 1,
    },

    total: {
        type: DataType.FLOAT,
        allowNull: false,
    },

    transactionFee: {
        type: DataType.FLOAT,
    },

    currency: {
        type: DataType.STRING,
        allowNull: false,
    },

    ipn_track_id: {
        type: DataType.STRING,
    },

    paymentType: {
        type: DataType.ENUM('booking', 'cancellation', 'host'),
        defaultValue: 'booking',
    },

    paymentMethodId: {
        type: DataType.INTEGER
    }

});

export default Transaction; 