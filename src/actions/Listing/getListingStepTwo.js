import { gql } from 'react-apollo';

import {
    GET_LISTING_DETAILS_START,
    GET_LISTING_DETAILS_SUCCESS,
    GET_LISTING_DETAILS_ERROR
} from '../../constants';

const query = gql`
query getStepTwo($listId:String!) {
    getStepTwo (listId:$listId) {
      id
      userId
      title
      description
      coverPhoto
      listPhotos {
        id
        name
      }
    }
  }
`;

export function getListingStepTwo(listId) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_LISTING_DETAILS_START,
            payload: {
                isLoading: true,
            }
        });

        try {
            // Send Request to get listing data
            const { data } = await client.query({
                query,
                variables: {
                    listId
                },
                fetchPolicy: 'network-only',
            });

            if (data && data.getStepTwo) {
                let isStepTwo = data && data.getStepTwo;

                dispatch({
                    type: GET_LISTING_DETAILS_SUCCESS,
                    payload: {
                        // specialPricing: data.getSpecialPricing,
                        stepTwoDetails: isStepTwo,
                        isLoading: false,
                    }
                });
            } else {
                dispatch({
                    type: GET_LISTING_DETAILS_ERROR,
                    payload: {
                        isLoading: false,
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: GET_LISTING_DETAILS_ERROR,
                payload: {
                    error,
                    isLoading: false,
                },
            });
            return false;
        }

        return true;
    };
}
