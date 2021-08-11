import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const UserDashboardType = new ObjectType({
    name: 'UserDashboard',
    fields: {
        totalCount: {
            type: IntType
        },
        todayCount: {
            type: IntType
        },
        monthCount: {
            type: IntType
        },
        status: {
            type: StringType
        }
    }
});

export default UserDashboardType;