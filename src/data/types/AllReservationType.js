import {
	GraphQLObjectType as ObjectType,
	GraphQLList as List,
	GraphQLString as StringType,
	GraphQLInt as IntType,
} from 'graphql';

import ReservationType from './ReservationType';

const AllReservationType = new ObjectType({
	name: 'AllReservation',
	fields: {
		reservationData: {
			type: new List(ReservationType)
		},
		count: {
			type: IntType
		},
		currentPage: {
			type: IntType
		},
		status: {
			type: StringType
		}
	}
});

export default AllReservationType;