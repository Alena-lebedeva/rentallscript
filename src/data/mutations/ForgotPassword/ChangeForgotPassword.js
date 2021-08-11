// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import userEditProfileType from '../../types/userEditProfileType';

// Sequelize models
import { User, ForgotPassword } from '../../models';

const changeForgotPassword = {

  type: userEditProfileType,

  args: {
    email: { type: new NonNull(StringType) },
    newPassword: { type: new NonNull(StringType) },
  },

  async resolve({ request, response }, {
    email,
    newPassword,
  }) {

    if (!request.user) {
      var isPasswordUpdated = false;

      const updatePassword = User.update(
        {
          password: User.generateHash(newPassword)
        },
        {
          where: {
            email
          }
        }
      );
      const removeTokens = ForgotPassword.destroy({
        where: {
          email
        }
      });

      return {
        status: '200'
      };

    } else {
      return {
        status: '400'
      };
    }
  },
};

export default changeForgotPassword;


/**
mutation changeForgotPassword($email: String!, $newPassword: String!) {
  changeForgotPassword (email: $email, newPassword: $newPassword) {
    status
  }
}
 */
