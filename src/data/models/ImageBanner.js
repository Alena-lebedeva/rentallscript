import DataType from 'sequelize';
import Model from '../sequelize';

const ImageBanner = Model.define('ImageBanner', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataType.STRING,
        allowNull: false
    },

    description: {
        type: DataType.STRING,
        allowNull: false
    },

    buttonLabel: {
        type: DataType.STRING,
        allowNull: false
    },

    image: {
        type: DataType.STRING,
    }
});

export default ImageBanner;