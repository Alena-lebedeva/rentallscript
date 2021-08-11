import DataType from 'sequelize';
import Model from '../sequelize';

const WishList = Model.define('WishList', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    wishListGroupId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    userId: {
        type: DataType.UUID,
        allowNull: false
    },

    isListActive: {
        type: DataType.BOOLEAN,
    }

});

export default WishList;