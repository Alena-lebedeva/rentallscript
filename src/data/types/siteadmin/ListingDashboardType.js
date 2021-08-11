import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const ListingDashboardType = new ObjectType({
    name: 'ListingDashboard',
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

export default ListingDashboardType;