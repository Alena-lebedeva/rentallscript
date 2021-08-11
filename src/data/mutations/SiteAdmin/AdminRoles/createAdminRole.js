// GrpahQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLList as List
} from 'graphql';

import AdminRolesType from '../../../types/siteadmin/AdminRolesType';

// Sequelize models
import { AdminRoles, AdminPrivileges } from '../../../models';

const createAdminRole = {

    type: AdminRolesType,

    args: {
        id: { type: IntType },
        name: { type: new NonNull(StringType) },
        description: { type: StringType },
        privileges: { type: new NonNull(new List(IntType)) }
    },

    async resolve({ request, response }, {
        id,
        name,
        description,
        privileges
    }) {
        let privilegesData = [];
        if (request.user.admin) {
            if (id) {
                let isExistAdminRole = await AdminRoles.findOne({
                    where: {
                        id
                    },
                    raw: true
                });

                if (isExistAdminRole) {
                    const updateRole = await AdminRoles.update({
                            name,
                            description
                        }, {
                            where: {
                                id
                            }
                        }
                    );
    
                    if (updateRole) {
                        if (privileges && privileges.length > 0) {
                            privileges.map((item) => {
                                privilegesData.push({
                                    roleId: id,
                                    previlegeId: item
                                });
                            });
                            await AdminPrivileges.destroy({ where: { roleId: id }});
                            await AdminPrivileges.bulkCreate(privilegesData);
                        }

                        return await {
                            status: 200
                        };
                    } else {
                        return await {
                            status: 400,
                            errorMessage: 'Oops! something went wrong. Please try again.'
                        };
                    }
                } else {
                    return await {
                        status: 404,
                        errorMessage: 'Sorry, unable to find this admin role.'
                    };
                }
            } else { // Create
                const createRole = await AdminRoles.create({
                    name,
                    description
                });

                if (createRole) {
                    let createdId = createRole.dataValues.id;

                    if (privileges && privileges.length > 0) {
                        privileges.map((item) => {
                            privilegesData.push({
                                roleId: createdId,
                                previlegeId: item
                            });
                        });
                        await AdminPrivileges.bulkCreate(privilegesData);
                    }

                    return await {
                        status: 200
                    };
                } else {
                    return await {
                        status: 400,
                        errorMessage: 'Oops! something went wrong. Please try again.'
                    };
                }
            }
        } else {
            return {
                status: 500,
                errorMessage: 'Oops! Please login and continue.'
            }
        }
    }
}

export default createAdminRole;

/*

mutation ($id: Int, $name: String!, $description: String, $privileges: [Int]!) {
  createAdminRole (id: $id, name: $name, description: $description, privileges: $privileges) {
    status
    errorMessage
  }
}
 
 

*/