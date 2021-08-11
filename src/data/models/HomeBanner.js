import DataType from 'sequelize';
import Model from '../sequelize';

const HomeBanner = Model.define('HomeBanner', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataType.STRING,
        allowNull: false
    },

    enable: {
        type: DataType.INTEGER,
        allowNull: false
    },
});

export default HomeBanner;