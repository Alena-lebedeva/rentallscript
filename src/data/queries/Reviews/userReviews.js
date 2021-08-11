// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import ReviewsType from '../../types/ReviewsType';

// Sequelize models
import { Reviews, UserProfile } from '../../models';

const userReviews = {

    type: new List(ReviewsType),

    args: {
        ownerType: { type: StringType },
        offset: { type: IntType },
        profileId: { type: IntType },
        loadCount: { type: IntType },
    },

    async resolve({ request, response }, { ownerType, offset, profileId, loadCount }) {
        let limit = 3;
        if (loadCount) {
            limit = loadCount;
        }
        let userId;
        if (profileId) {
            const getUser = await UserProfile.findOne({
                where: {
                    profileId
                }
            });
            userId = getUser.userId;
        } else {
            if (request.user && !request.user.admin) {
                userId = request.user.id;
            }

        }

        let where = {};
        if (ownerType === 'me') {
            where = {
                authorId: userId,
                isAdminEnable: true
            };
        } else {
            where = {
                userId,
                isAdminEnable: true
            };
        }
        return await Reviews.findAll({
            where,
            limit,
            offset
        });
    },
};

export default userReviews;

/**
query userReviews($ownerType: String){
    userReviews(ownerType: $ownerType){
        id
        reservationId
        listId
        authorId
        userId
        reviewContent
        rating
        parentId
        automated
        createdAt
        status
    	response {
          id
          reservationId
          listId
          authorId
          userId
          reviewContent
          rating
          parentId
          automated
          createdAt
          status
        }
    }
}
**/