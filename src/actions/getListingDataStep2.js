import { gql } from 'react-apollo';

import {
  GET_LISTING_DATA_STEP2_START,
  GET_LISTING_DATA_STEP2_SUCCESS,
  GET_LISTING_DATA_STEP2_ERROR
} from '../constants';

import { initialize } from 'redux-form';

const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      title
      description
      coverPhoto
    }
  }
`;

export function getListingDataStep2(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_DATA_STEP2_START,
    });

    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, preview: true },
        fetchPolicy: 'network-only',
      });


      if (data && data.UserListing) {
        // Reinitialize the form values
        await dispatch(initialize('ListPlaceStep2', data.UserListing, true));

        // Dispatch a success action
        dispatch({
          type: GET_LISTING_DATA_STEP2_SUCCESS,
          step2DataIsLoaded: true,
          isExistingList: true,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_DATA_STEP2_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}
