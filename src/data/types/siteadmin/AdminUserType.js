import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

import { AdminRoles } from '../../models';
import AdminRolesType from '../../types/siteadmin/AdminRolesType';

const AdminUserType = new ObjectType({
    name: 'AdminUserType',
    fields: {
        id: {
            type: StringType
        },
        email: {
            type: StringType
        },
        password: {
            type: StringType
        },
        isSuperAdmin: {
            type: BooleanType
        },
        roleId: {
            type: IntType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        adminRole: {
            type: AdminRolesType,
            async resolve(adminUser) {
                return await AdminRoles.findOne({
                    where: {
                        id: adminUser.roleId
                    }
                });
            }
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default AdminUserType;