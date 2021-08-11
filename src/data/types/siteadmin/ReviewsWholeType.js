import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';

import ReviewsType from '../../types/ReviewsType';

const ReviewsWholeType = new ObjectType({
    name: 'ReviewsWholeType',

    fields: {
        reviewsData: {
            type: new List(ReviewsType)
        },
        count: {
            type: IntType
        }
    },
});
export default ReviewsWholeType;
