import DataType from 'sequelize';
import Model from '../sequelize';

const FooterBlock = Model.define('FooterBlock', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    title1: {
        type: DataType.STRING,
        allowNull: false
    },

    content1: {
        type: DataType.TEXT,
        allowNull: false
    },

    title2: {
        type: DataType.STRING,
        allowNull: false
    },

    content2: {
        type: DataType.TEXT,
        allowNull: false
    },

    title3: {
        type: DataType.STRING,
        allowNull: false
    },

    content3: {
        type: DataType.TEXT,
        allowNull: false
    },

    isEnable: {
        type: DataType.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
});

export default FooterBlock; 