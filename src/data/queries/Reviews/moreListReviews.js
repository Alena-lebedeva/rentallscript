// GrpahQL
import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ReviewsType from '../../types/ReviewsType';

// Sequelize models
import { Reviews, Listing } from '../../models';

const moreListReviews = {

    type: new List(ReviewsType),

    args: {
        listId: { type: new NonNull(IntType) },
        offset: { type: IntType },
        loadCount: { type: IntType },
    },

    async resolve({ request, response }, { listId, hostId, offset, loadCount }) {
        let limit = 3;
        if (loadCount) {
            limit = loadCount;
        }
        const getListData = await Listing.findOne({
            where: {
                id: listId
            }
        });
        if (getListData) {
            return await Reviews.findAll({
                where: {
                    listId,
                    userId: getListData.userId,
                    isAdminEnable: true
                },
                limit,
                offset
            });
        }
    },
};

export default moreListReviews;

/**
query MoreListReviews($listId: Int!, $offset: Int){
    moreListReviews(listId: $listId, offset: $offset){
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
**/