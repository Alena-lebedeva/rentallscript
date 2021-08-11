import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

const UnreadCountType = new ObjectType({
    name: 'UnreadThreadsCount',
    fields: {
        hostCount: {
            type: IntType
        },
        guestCount: {
            type: IntType
        },
        total: {
            type: IntType
        },
        status: {
            type: StringType
        }
    }
});

export default UnreadCountType;