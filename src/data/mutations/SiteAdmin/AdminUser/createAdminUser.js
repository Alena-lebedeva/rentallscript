// GrpahQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import AdminUserType from '../../../types/siteadmin/AdminUserType';

// Sequelize models
import { AdminUser, AdminRoles } from '../../../models';

const createAdminUser = {

    type: AdminUserType,

    args: {
        id: { type: StringType },
        email: { type: new NonNull(StringType) },
        password: { type: StringType },
        roleId: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, {
        id,
        email,
        password,
        roleId
    }) {

        try {
            if (request.user && request.user.admin) {
                let isAlreadyExist = await AdminUser.findOne({
                    attributes: ['id', 'email'],
                    where: { 
                        email
                    },
                    raw: true
                });

                let isValidRoleId = await AdminRoles.findOne({
                    attributes: ['id'],
                    where: {
                        id: roleId
                    }
                });

                if (!isValidRoleId) {
                    return await {
                        status: 400,
                        errorMessage: 'Oops, it looks like the chosen role is not valid. Please try with different valid role.'
                    };
                }
    
                if (id) { // Update
                    if (isAlreadyExist && isAlreadyExist.id != id) {
                        return await {
                            status: 400,
                            errorMessage: 'Oops! this email address is already exist.'
                        };
                    } else {
                        const updateUser = await AdminUser.update({
                            email,
                            roleId
                        }, {
                            where: {
                                id
                            }
                        });
    
                        if (password && password.toString().trim() != '') {
                            const updatePassword = await AdminUser.update({
                                password: AdminUser.generateHash(password)
                            }, {
                                where: {
                                    id
                                }
                            });
                        }
    
                        if (updateUser) {
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
                } else { // Create
                    if (isAlreadyExist) {
                        return await {
                            status: 400,
                            errorMessage: 'Oops! this email address is already exist.'
                        };
                    } else {
                        const createUser = await AdminUser.create({
                            email,
                            password: AdminUser.generateHash(password),
                            isSuperAdmin: false,
                            roleId
                        });
    
                        if (createUser) {
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
                }
            } else {
                return {
                    status: 500,
                    errorMessage: 'Oops! Please login and continue.'
                };
            } 
        } catch(error) {
            return await {
                status: 500,
                errorMessage: 'Oops! this email address is already exist.'
            };
        }
    }
}

export default createAdminUser;

/*

mutation ($id: String, $email: String!, $password: String, $roleId: Int!) {
  createAdminUser (id: $id, email: $email, password: $password, roleId: $roleId) {
    status
    errorMessage
  }
}

*/