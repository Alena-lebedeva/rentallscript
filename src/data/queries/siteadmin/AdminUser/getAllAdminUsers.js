import { AdminUser } from '../../../models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';

import {
    GraphQLList as List
} from 'graphql';

const getAllAdminUsers = {

    type: new List(AdminUserType),

    async resolve({ request }) {
        return await AdminUser.findAll({
            where: {
              isSuperAdmin: {
                $ne: true
              }
            },
            order: [['updatedAt', 'DESC']]
        });
    }
};

export default getAllAdminUsers;

/**
query {
  getAllAdminUsers {
    id
    email
    isSuperAdmin
    roleId
    createdAt
    updatedAt
    adminRole {
      id
      name
      description
      createdAt
      updatedAt
      privileges
    }
  }
}

**/