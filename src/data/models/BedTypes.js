import DataType from 'sequelize';
import Model from '../sequelize';

const BedTypes = Model.define('BedTypes', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    bedCount: {
        type: DataType.INTEGER,
    },

    bedType: {
        type: DataType.INTEGER,
    }
});

export default BedTypes;