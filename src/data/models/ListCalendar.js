import DataType from 'sequelize';
import Model from '../sequelize';

const ListCalendar = Model.define('ListCalendar', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false,
    },

    name: {
        type: DataType.STRING,
        allowNull: false
    },

    url: {
        type: DataType.TEXT,
        allowNull: false
    }
});

export default ListCalendar;   