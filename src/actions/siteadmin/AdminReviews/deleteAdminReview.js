import { gql } from 'react-apollo';

import {
    ADMIN_DELETE_REVIEW_START,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_ERROR
} from '../../../constants';

// Redirection
import history from '../../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';

const query = gql`
    query getAdminReviews {
        getAdminReviews {
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
`;

const mutation = gql`
  mutation deleteAdminReview ($reviewId: Int!) {
      deleteAdminReview (reviewId: $reviewId) {
        status
      }
    }
  `;

export function deleteAdminReview(reviewId) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_REVIEW_START,
            data: reviewId
        });
        try {

            const { data } = await client.mutate({
                mutation,
                variables: { reviewId },
                refetchQueries: [{ query, variables: { currentPage: 1 } }]
            });

            if (data.deleteAdminReview.status == "200") {
                dispatch({
                    type: ADMIN_DELETE_REVIEW_SUCCESS,
                });
                toastr.success("Delete Review", "Review deleted successfully!");
                history.push('/siteadmin/reviews');
            } else {
                toastr.error("Delete Review", "Review deletion failed!");
            }

        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_REVIEW_ERROR,
                payload: {
                    error
                }
            });

        }

    };
}