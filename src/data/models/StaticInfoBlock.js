import DataType from 'sequelize';
import Model from '../sequelize';

const StaticInfoBlock = Model.define('StaticInfoBlock', {

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

    content: {
        type: DataType.TEXT,
        allowNull: false
    },

    image: {
        type: DataType.STRING
    },

    name: {
        type: DataType.STRING
    },

    isEnable: {
        type: DataType.BOOLEAN,
        defaultValue: true
    }
});

export default StaticInfoBlock;