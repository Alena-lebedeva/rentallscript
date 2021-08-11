import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

// Models
import { Reviews } from '../../models';

// Types
import ReviewsType from '../../types/ReviewsType';

const editAdminReview = {

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

export default editAdminReview;

/*

query editAdminReview ($reviewId: Int!) {
    editAdminReview (reviewId: $reviewId) {
        id
        listId
        reviewContent
        rating
    }
}

*/
