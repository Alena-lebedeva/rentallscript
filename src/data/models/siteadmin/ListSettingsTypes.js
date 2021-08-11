import DataType from 'sequelize';
import Model from '../../sequelize';

const ListSettingsTypes = Model.define('ListSettingsTypes', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  typeName: {
    type: DataType.STRING,
    allowNull: false,
  },

  typeLabel: {
    type: DataType.STRING,
    allowNull: false,
  },

  fieldType: {
    type: DataType.ENUM('stringType', 'numberType'),
    defaultValue: 'stringType',
  },

  step: {
    type: DataType.INTEGER,
    defaultValue: 1,
  },

  isEnable: {
    type: DataType.STRING,
    defaultValue: "1",
  },

  isMultiValue: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

});

export default ListSettingsTypes;
