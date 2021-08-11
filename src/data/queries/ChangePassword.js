// GrpahQL
import {
  GraphQLString as StringType
} from 'graphql';
import userEditProfileType from '../types/userEditProfileType';

// Authentication Utils
import bcrypt from 'bcrypt';

// Sequelize models
import { User } from '../../data/models';

const ChangePassword = {

  type: userEditProfileType,

  args: {
    oldPassword: { type: StringType },
    newPassword: { type: StringType },
    confirmPassword: { type: StringType },
    registeredType: { type: StringType },
  },

  async resolve({ request, response }, {
    oldPassword,
    newPassword,
    confirmPassword,
    registeredType
  }) {

    if (request.user && request.user.admin != true) {

      //Collect from Logged-in User
      const id = request.user.id;
      const email = request.user.email;

      // Check old password is correct
      const userLogin = await User.findOne({
        attributes: ['password'],
        where: { email },
      });
      // For Social Media
      if (registeredType === 'facebook' || registeredType === 'google') {
        const updatePassword = User.update(
          {
            password: User.generateHash(newPassword)
          },
          {
            where: {
              id
            }
          }
        );
        return {
          status: 'success'
        };
      }

      // For Email Registered Users
      if (bcrypt.compareSync(oldPassword, userLogin.password)) {
        // Check new password and confirm password
        if (newPassword === confirmPassword) {
          // Update new password
          const updatePassword = User.update(
            {
              password: User.generateHash(newPassword)
            },
            {
              where: {
                id
              }
            }
          );
          return {
            status: 'success'
          };
        } else {
          return {
            status: "WrongConfirmPassword",
          };
        }
      } else {
        return {
          status: "WrongPassword",
        };
      }
    } else {
      return {
        status: 'notLoggedIn'
      };
    }
  },
};

export default ChangePassword;
