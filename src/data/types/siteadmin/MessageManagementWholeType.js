import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';

import ThreadsType from '../../types/ThreadsType';

const MessageManagementWholeType = new ObjectType({
    name: 'MessageManagementWholeType',

    fields: {
        usersData: {
            type: new List(ThreadsType)
        },
        count: {
            type: IntType
        }
    },
});
export default MessageManagementWholeType;
