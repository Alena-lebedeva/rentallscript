import { gql } from 'react-apollo';
import moment from 'moment';

import {
  CHECK_AVAILABLE_DATES_START,
  CHECK_AVAILABLE_DATES_SUCCESS,
  CHECK_AVAILABLE_DATES_ERROR
} from '../constants';

const query = gql`
    query ($listId:Int!,  $startDate: String!, $endDate: String!) {
    DateAvailability (listId:$listId, startDate:$startDate, endDate: $endDate) {
      status
    }
  }
`;

export function checkAvailability(listId, startDate, endDate, maximumNights) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: CHECK_AVAILABLE_DATES_START,
      isLoading: true,
      payload: {
        maximumStay: false
      }
    });

    if (maximumNights && maximumNights > 0) {
      let momentStartDate = moment(startDate);
      let momentEndDate = moment(endDate);
      let dayDifference = momentEndDate.diff(momentStartDate, 'days');
      if (dayDifference > maximumNights) {
        dispatch({
          type: CHECK_AVAILABLE_DATES_SUCCESS,
          isLoading: false,
          payload: {
            maximumStay: true
          }
        });
        return true;
      }
    }

    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, startDate, endDate },
        fetchPolicy: 'network-only',
      });

      if (data && data.DateAvailability) {
        let availability = true;
        if (data.DateAvailability.status === 'NotAvailable') {
          availability = false;
        }
        dispatch({
          type: CHECK_AVAILABLE_DATES_SUCCESS,
          isLoading: false,
          availability,
          payload: {
            maximumStay: false
          }
        });
      } else {
        dispatch({
          type: CHECK_AVAILABLE_DATES_ERROR,
          isLoading: false,
          availability: false
        });
      }
    } catch (error) {
      dispatch({
        type: CHECK_AVAILABLE_DATES_ERROR,
        payload: {
          error,
        },
        isLoading: false,
      });
      return false;
    }

    return true;
  };
}
