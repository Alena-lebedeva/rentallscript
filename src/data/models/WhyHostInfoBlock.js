import DataType from 'sequelize';
import Model from '../sequelize';

const WhyHostInfoBlock = Model.define('WhyHostInfoBlock', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataType.STRING
    },

    name: {
        type: DataType.STRING
    },

    value: {
        type: DataType.STRING
    }

    
});

export default WhyHostInfoBlock;