import {
	GraphQLObjectType as ObjectType,
	GraphQLList as List,
	GraphQLString as StringType,
	GraphQLInt as IntType,
} from 'graphql';

import ThreadsType from './ThreadsType';

const AllThreadsType = new ObjectType({
	name: 'AllThreads',
	fields: {
		threadsData: {
			type: new List(ThreadsType)
		},
		count: {
			type: IntType
		},
		status: {
			type: StringType
		}
	}
});

export default AllThreadsType;