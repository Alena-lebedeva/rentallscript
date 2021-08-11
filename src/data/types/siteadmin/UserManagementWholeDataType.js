import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';
import UserManagementType from '../../types/siteadmin/UserManagementType';
const UserManagementWholeDataType = new ObjectType({
    name: 'UserManagementWholeDataType',
    description: "This represent user data for admin management",
    fields: {
        usersData: {
            type: new List(UserManagementType)
        },
        count: {
            type: IntType
        }
    },
});
export default UserManagementWholeDataType;
