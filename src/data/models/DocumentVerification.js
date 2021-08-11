import DataType from 'sequelize';
import Model from '../sequelize';

const DocumentVerification = Model.define('DocumentVerification', {

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

    fileName: {
        type: DataType.STRING,
    },


    fileType: {
        type: DataType.STRING,
    },

    documentStatus: {
        type: DataType.ENUM('pending', 'approved'),
        defaultValue: 'pending',
    },


});

export default DocumentVerification;