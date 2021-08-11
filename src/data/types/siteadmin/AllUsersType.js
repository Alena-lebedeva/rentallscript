import {
	GraphQLObjectType as ObjectType,
	GraphQLList as List,
	GraphQLString as StringType,
	GraphQLInt as IntType,
} from 'graphql';

import UserManagementType from './UserManagementType';

const AllUsersType = new ObjectType({
	name: 'AllUsers',
	fields: {
		usersData: {
			type: new List(UserManagementType)
		},
		count: {
			type: IntType
		},
		status: {
			type: StringType
		}
	}
});

export default AllUsersType;