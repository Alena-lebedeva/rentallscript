import DataType from 'sequelize';
import Model from '../../sequelize';

const AdminPrivileges = Model.define('AdminPrivileges', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  roleId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  previlegeId: {
    type: DataType.INTEGER,
    allowNull: false
  }

});

export default AdminPrivileges;
