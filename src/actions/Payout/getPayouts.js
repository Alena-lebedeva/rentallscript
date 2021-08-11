import { toastr } from 'react-redux-toastr';
import {
  GET_PAYOUT_START,
  GET_PAYOUT_SUCCESS,
  GET_PAYOUT_ERROR,
} from '../../constants';

import getPayoutsQuery from './getPayouts.graphql';

export function getPayouts(currentAccountId) {

  return async (dispatch, getState, { client }) => {

    await dispatch({
      type: GET_PAYOUT_START,
      payload: {
        getPayoutLoading: true
      }
    });

    try {
      const { data } = await client.query({
        query: getPayoutsQuery,
        variables: {
          currentAccountId
        },
        fetchPolicy: 'network-only'
      });

      if (data && data.getPayouts && data.getPayouts.length >= 0) {
        await dispatch({
          type: GET_PAYOUT_SUCCESS,
          payload: {
            payoutData: data.getPayouts,
            getPayoutLoading: false
          }
        });
      } else {
        await dispatch({
          type: GET_PAYOUT_ERROR,
          payload: {
            error: 'No records found.',
            getPayoutLoading: false
          }
        });
      }
    } catch (error) {
      await dispatch({
        type: GET_PAYOUT_ERROR,
        payload: {
          error,
          getPayoutLoading: false
        }
      });
      return false;
    }

    return true;
  };
}
