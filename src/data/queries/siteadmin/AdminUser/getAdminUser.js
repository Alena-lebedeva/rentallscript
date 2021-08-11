import { AdminUser } from '../../../models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';

const getAdminUser = {

  type: AdminUserType,

  async resolve({ request }) {
    if (request.user && request.user.admin === true) {
      return await AdminUser.findOne({
        where: {
          id: request.user.id
        }
      });
    } else {
      return {
        status: 500,
        errorMessage: "Please login with your account and continue."
      }
    }
  }
};

export default getAdminUser;

/**
query {
  getAdminUser {
    id
    email
    isSuperAdmin
    roleId
    createdAt
    updatedAt
    adminRole {
      id
      privileges
    }
    status
    errorMessage
  }
}

**/