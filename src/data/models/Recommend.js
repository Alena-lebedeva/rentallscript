import DataType from 'sequelize';
import Model from '../sequelize';

const Recommend = Model.define('Recommend', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false
    }
});

export default Recommend; 