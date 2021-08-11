import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import ReportUserType from '../../types/ReportUserType';

const ReportUserWholeType = new ObjectType({
    name: 'ReportUserWholeType',

    fields: {
        reportsData: {
            type: new List(ReportUserType)
        },
        count: {
            type: IntType
        }
    },
});
export default ReportUserWholeType;
