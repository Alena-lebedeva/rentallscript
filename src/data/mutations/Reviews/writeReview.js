// GrpahQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType,
} from 'graphql';

import ReviewsType from '../../types/ReviewsType';

// Sequelize models
import { Reviews } from '../../models';

const writeReview = {

    type: ReviewsType,

    args: {
        reservationId: { type: new NonNull(IntType) },
        listId: { type: new NonNull(IntType) },
        receiverId: { type: new NonNull(StringType) },
        reviewContent: { type: new NonNull(StringType) },
        rating: { type: new NonNull(FloatType) },
        automated: { type: BooleanType },
    },

    async resolve({ request, response }, {
        reservationId,
        listId,
        receiverId,
        reviewContent,
        rating,
        automated
    }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            const userId = request.user.id;
            let parentId = 0, isReviewCreated = false;

            const isOtherUserReview = await Reviews.findOne({
                where: {
                    reservationId,
                    userId,
                    isAdminEnable: true
                }
            });

            if (isOtherUserReview) {
                parentId = isOtherUserReview.id;
            }

            const createReview = await Reviews.findOrCreate({
                where: {
                    reservationId,
                    authorId: userId,
                    isAdminEnable: true
                },
                defaults: {
                    //properties you want on create
                    reservationId,
                    listId,
                    authorId: userId,
                    userId: receiverId,
                    reviewContent,
                    rating,
                    parentId,
                    automated
                }
            })
                .spread((review, created) => {
                    if (created) {
                        isReviewCreated = true;
                    }
                });

            if (isReviewCreated) {
                return {
                    status: '200'
                }
            } else {
                return {
                    status: '400'
                }
            }

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    },
};

export default writeReview;

/**
mutation writeReview(
    $reservationId: Int!,
    $listId: Int!,
    $receiverId: String!,
    $reviewContent: String!,
    $rating: Float!,
){
    writeReview(
        reservationId: $reservationId,
        listId: $listId,
        receiverId: $receiverId,
        reviewContent: $reviewContent,
        rating: $rating,
    ) {
        status
    }
}
**/
