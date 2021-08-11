import {
    GraphQLList as List
} from 'graphql';

// Models
import { Reviews } from '../../models';

// Types
import ReviewsType from '../../types/ReviewsType';

const getAdminReviews = {

    type: new List(ReviewsType),

    async resolve({ request }) {
        if (request.user.admin) {
            let isAdmin = 1;

            return await Reviews.findAll({
                where: {
                    isAdmin
                },
                order: [['updatedAt', 'DESC']]
            });
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getAdminReviews;

/**

query getAdminReviews {
  getAdminReviews{
    id
    listId
    listData {
      id
      title
    }
    authorId
    reviewContent
    rating
    createdAt
    updatedAt
  }
}

**/