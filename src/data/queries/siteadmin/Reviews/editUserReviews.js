import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

// Models
import { Reviews } from '../../../models';

// Types
import ReviewsType from '../../../types/ReviewsType';

const editUserReviews = {

    type: ReviewsType,

    args: {
        reviewId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { reviewId }) {

        // Get All User Profile Data
        const reviewData = await Reviews.find({
            attributes: [
                'id',
                'listId',
                'reviewContent',
                'rating'
            ],
            where: {
                id: reviewId
            }
        });

        return reviewData;

    },
};

export default editUserReviews;

/*

query editUserReviews ($reviewId: Int!) {
    editUserReviews (reviewId: $reviewId) {
        id
        listId
        reviewContent
        rating
    }
}

*/
