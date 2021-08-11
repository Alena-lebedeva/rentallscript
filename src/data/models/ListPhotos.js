import DataType from 'sequelize';
import Model from '../sequelize';

const ListPhotos = Model.define('ListPhotos', {

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
    allowNull: false,
  },

  type: {
    type: DataType.STRING,
    defaultValue: false,
  },

  isCover: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },

});

export default ListPhotos;
