import DataType from 'sequelize';
import Model from '../sequelize';

const UserVerifiedInfo = Model.define('UserVerifiedInfo', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV1,
        allowNull: false
    },

    isEmailConfirmed: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },

    isFacebookConnected: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },

    isGoogleConnected: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },

    isIdVerification: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    },

    isPhoneVerified: {
        type: DataType.BOOLEAN,
        defaultValue: false,
    }
});

export default UserVerifiedInfo;