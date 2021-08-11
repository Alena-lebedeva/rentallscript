import { gql } from 'react-apollo';

import {
  MANAGE_LISTING_STEPS_DATA_START,
  MANAGE_LISTING_STEPS_DATA_SUCCESS,
  MANAGE_LISTING_STEPS_DATA_ERROR
} from '../constants';


const query = gql`
  query ($listId:String!, $currentStep: Int!) {
    ManageListingSteps (listId:$listId, currentStep: $currentStep) {
      id
      listId
      step1
      step2
      step3
      step4
      listing {
        id
        isReady
        isPublished
      }
      status
    }
  }
`;

export function manageListingSteps(listId, currentStep) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: MANAGE_LISTING_STEPS_DATA_START,
    });

    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, currentStep },
        fetchPolicy: 'network-only'
      });

      if (data && data.ManageListingSteps) {
        dispatch({
          type: MANAGE_LISTING_STEPS_DATA_SUCCESS,
          listingSteps: data.ManageListingSteps
        });
      } else {
        dispatch({
          type: MANAGE_LISTING_STEPS_DATA_ERROR,
        });
        return false;
      }

    } catch (error) {
      dispatch({
        type: MANAGE_LISTING_STEPS_DATA_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
