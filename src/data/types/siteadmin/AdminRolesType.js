import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import { AdminPrivileges } from '../../models';

const AdminRolesType = new ObjectType({
    name: 'AdminRolesType',
    fields: {
        id: {
            type: IntType
        },
        name: {
            type: StringType
        },
        description: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        privileges: {
            type: new List(IntType),
            async resolve(role) {
                let adminPrivileges = await AdminPrivileges.findAll({
                    attributes: ['previlegeId'],
                    where: {
                        roleId: role.id 
                    },
                    raw: true
                });

                return await adminPrivileges.map((item) => item.previlegeId);
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

export default AdminRolesType;