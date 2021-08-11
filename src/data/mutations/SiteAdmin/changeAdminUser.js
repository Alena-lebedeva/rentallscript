import AdminUserLoginType from '../../types/siteadmin/AdminUserLoginType';
import { AdminUser } from '../../models';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const changeAdminUser = {

  type: AdminUserLoginType,

  args: {
    email: { type: StringType },
    password: { type: new NonNull(StringType) }
  },

  async resolve({ request }, { email, password }) {

    if (request.user && request.user.admin) {
      let isAdminUpdated = false;
      const userId = request.user.id;
      let adminEmail = request.user.email;
      if (email) {
        adminEmail = email;
      }

      const updateAdmin = await AdminUser.update(
        {
          email: adminEmail,
          password: AdminUser.generateHash(password)
        },
        {
          where: {
            id: userId
          }
        }
      )
        .spread(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isAdminUpdated = true;
          }
        });

      if (isAdminUpdated) {
        return {
          status: '200'
        }
      } else {
        return {
          status: '400'
        }
      }
    } else {
      return {
        status: "500"
      }
    }
  },
};

export default changeAdminUser;

/*

mutation changeAdminUser($email: String, $password: String!) {
  changeAdminUser (email: $email, password: $password) {
    status
  }
}

*/