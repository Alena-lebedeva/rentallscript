import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const ReservationDashboardType = new ObjectType({
    name: 'ReservationDashboard',
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

export default ReservationDashboardType;