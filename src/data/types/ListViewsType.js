import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const ListViewsType = new ObjectType({
    name: 'ListViews',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: StringType
        },
        userId: {
            type: StringType
        },
        count: {
            type: IntType
        },
        createdAt: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export default ListViewsType;