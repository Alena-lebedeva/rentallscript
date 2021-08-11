// GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import AdminRolesType from '../../../types/siteadmin/AdminRolesType';

// Sequelize models
import { AdminRoles, AdminPrivileges, AdminUser } from '../../../models';

const deleteAdminRole = {

    type: AdminRolesType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, { id }) {
        try {
            if (request.user && request.user.admin) {
                let isAdminUsing = await AdminUser.findOne({
                    attributes: ['id'],
                    where: {
                        roleId: id
                    }
                }); 
                if (isAdminUsing) {
                    return await  {
                        status: 400,
                        errorMessage: 'Oops! Unable to delete the admin role due to some admin user using this role.'
                    };
                } else {
                    await AdminRoles.destroy({ where: { id }});
                    await AdminPrivileges.destroy({ where: { roleId: id }});
                    return await {
                        status: 200
                    };
                }
            } else {
                return {
                    status: 500,
                    errorMessage: 'Oops! Please login and continue.'
                };
            }
        } catch(error) {
            return {
                status: 400,
                errorMessage: error
            }
        }
    }
}

export default deleteAdminRole;

/*

mutation ($id: Int!) {
  deleteAdminRole (id: $id) {
    status
    errorMessage
  }
}
 
 

*/