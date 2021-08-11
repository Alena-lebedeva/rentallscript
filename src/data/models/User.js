import DataType from 'sequelize';
import Model from '../sequelize';
import bcrypt from 'bcrypt';
import { NULL } from 'graphql/language/kinds';
const User = Model.define('User', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
    allowNull: false,
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataType.STRING,
  },
  userBanStatus: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  userDeletedAt: {
    type: DataType.DATE,
  }
}, {
    classMethods: {
      generateHash: function (password) { // eslint-disable-line
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
    },
    indexes: [
      { fields: ['email'] },
    ],
  });
export default User;
