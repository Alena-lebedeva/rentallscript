import DataType from 'sequelize';
import Model from '../../sequelize';

const PopularLocation = Model.define('PopularLocation', {

    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    location: {
        type: DataType.STRING,
        allowNull: false,
    },

    locationAddress: {
        type: DataType.STRING,
        allowNull: false,
    },

    image: {
        type: DataType.STRING,
    },

    isEnable: {
        type: DataType.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },

});

export default PopularLocation;
