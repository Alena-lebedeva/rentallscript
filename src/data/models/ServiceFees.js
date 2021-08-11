import DataType from 'sequelize';
import Model from '../sequelize';

const ServiceFees = Model.define('ServiceFees', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    guestType: {
        type: DataType.ENUM('fixed', 'percentage'),
        allowNull: false
    },

    guestValue: {
        type: DataType.FLOAT,
        allowNull: false
    },

    hostType: {
        type: DataType.ENUM('fixed', 'percentage'),
        allowNull: false
    },

    hostValue: {
        type: DataType.FLOAT,
        allowNull: false
    },

    currency: {
        type: DataType.STRING,
    }
});

export default ServiceFees; 