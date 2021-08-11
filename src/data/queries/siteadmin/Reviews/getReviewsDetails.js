// GrpahQL
import {
    GraphQLList as List
} from 'graphql';

import ReviewsType from '../../../types/ReviewsType';
import { Reviews } from '../../../models';

const getReviewsDetails = {

    type: new List(ReviewsType),

    async resolve({ request }) {

        if (request.user && request.user.admin == true) {
            return await Reviews.findAll({
                where: {
                    isAdmin: false
                }
            });
        }
    }
};

export default getReviewsDetails;

/*
query getReviewsDetails{
  	getReviewsDetails{
      id
      reservationId
      listId
      authorId
      userId
      reviewContent
      rating
      privateFeedback
      parentId
      automated
      isAdmin
      createdAt
      updatedAt
    }
}
*/
