import DataType from 'sequelize';
import Model from '../sequelize';

const WishListGroup = Model.define('WishListGroup', {

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

    userId: {
        type: DataType.UUID,
        allowNull: false
    },

    isPublic: {
        type: DataType.INTEGER,
        defaultValue: 1,
    }
});

export default WishListGroup;