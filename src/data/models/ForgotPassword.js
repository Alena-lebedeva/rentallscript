import DataType from 'sequelize';
import Model from '../sequelize';

const ForgotPassword = Model.define('ForgotPassword', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataType.UUID,
        allowNull: false
    },

    email: {
        type: DataType.STRING,
        allowNull: false
    },

    token: {
        type: DataType.STRING,
        allowNull: false
    }

});

export default ForgotPassword;