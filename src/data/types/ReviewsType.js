import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
} from 'graphql';

import { Reviews, UserProfile, Listing, Reservation } from '../models';
import ProfileType from './ProfileType';
import AdminListingType from './siteadmin/AdminListingType';
import SingleReservationType from './SingleReservationType';

const ReviewResponseType = new ObjectType({
    name: 'ReviewResponse',
    fields: {
        id: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        authorId: {
            type: StringType
        },
        authorData: {
            type: ProfileType,
            resolve(reviews){
               return UserProfile.findOne({
                    where: { userId: reviews.authorId }
                });
            }
        },
        userId: {
            type: StringType
        },
        userData: {
            type: ProfileType,
            resolve(reviews){
               return UserProfile.findOne({
                    where: { userId: reviews.userId }
                });
            }
        },
        reviewContent: {
            type: StringType
        },
        rating: {
            type: FloatType
        },
        privateFeedback: {
            type: StringType
        },
        parentId: {
            type: IntType
        },
        automated: {
            type: BooleanType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        isAdmin: {
            type: BooleanType
        }
    }
});

const ReviewsType = new ObjectType({
    name: 'Reviews',
    fields: {
        id: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        loadCount: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        listData: {
            type: AdminListingType,
            resolve(reviews) {
                return Listing.findOne({
                    where: { id: reviews.listId }
                })
            }
        },
        authorId: {
            type: StringType
        },
        authorData: {
            type: ProfileType,
            resolve(reviews){
               return UserProfile.findOne({
                    where: { userId: reviews.authorId }
                });
            }
        },
        userId: {
            type: StringType
        },
        userData: {
            type: ProfileType,
            resolve(reviews){
               return UserProfile.findOne({
                    where: { userId: reviews.userId }
                });
            }
        },
        reviewContent: {
            type: StringType
        },
        rating: {
            type: FloatType
        },
        privateFeedback: {
            type: StringType
        },
        parentId: {
            type: IntType
        },
        automated: {
            type: BooleanType
        },
        response: {
            type: ReviewResponseType,
            async resolve(reviews) {
                return await Reviews.findOne({
                    where: {
                        reservationId: reviews.reservationId,
                        authorId: reviews.userId,
                        isAdminEnable: true
                    }
                });
            }
        },
        yourReviewsCount: {
            type: IntType,
            async resolve(reviews) {
                return await Reviews.count({
                    where: {
                        userId: reviews.userId,
                        isAdminEnable: true
                    }
                });
            }
        },
        reviewsCount: {
            type: IntType,
            async resolve(reviews) {
                return await Reviews.count({
                    where: {
                        authorId: reviews.authorId,
                        isAdminEnable: true
                    }
                });
            }
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        isAdmin: {
            type: BooleanType
        },
        isAdminEnable: {
            type: BooleanType
        },
        singleReservationData: {
            type: SingleReservationType,
            async resolve(reviews) {
                return await Reservation.findOne({
                    where: { id: reviews.reservationId }
                });
            }
        }
    }
});



export default ReviewsType;