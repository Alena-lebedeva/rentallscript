import DataType from 'sequelize';
import Model from '../sequelize';

const ThreadItems = Model.define('ThreadItems', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    threadId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    reservationId: {
        type: DataType.INTEGER,
    },

    sentBy: {
        type: DataType.STRING,
        allowNull: false
    },

    content: {
        type: DataType.TEXT,
    },

    isRead: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },

    type: {
        type: DataType.ENUM('message', 'inquiry', 'preApproved', 'declined', 'approved', 'pending', 'cancelledByHost', 'cancelledByGuest', 'intantBooking', 'requestToBook', 'confirmed', 'expired', 'completed'),
        defaultValue: 'message',
    },

    startDate: {
        type: DataType.DATE,
    },

    endDate: {
        type: DataType.DATE,
    },

    personCapacity: {
        type: DataType.INTEGER,
    }
});

export default ThreadItems;   