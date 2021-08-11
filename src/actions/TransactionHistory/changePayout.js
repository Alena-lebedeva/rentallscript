import { gql } from 'react-apollo';

import {
  CHANGE_PAYOUT_START,
  CHANGE_PAYOUT_SUCCESS,
  CHANGE_PAYOUT_ERROR,
} from '../../constants';

//import getPayoutsQuery from './getPayouts.graphql';

export function changePayout(payoutId, reservationId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CHANGE_PAYOUT_START,
    });

    try {

      let mutation = gql`
          mutation updatePayoutForReservation(
            $payoutId: Int!, 
            $reservationId: Int!
          ){
              updatePayoutForReservation(
                payoutId: $payoutId,
                reservationId: $reservationId
              ) {
                  status
              }
          }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          payoutId,
          reservationId
        },
        //refetchQueries: [{ query: getPayoutsQuery }]
      });

      if (data && data.updatePayoutForReservation) {
        dispatch({
          type: CHANGE_PAYOUT_SUCCESS,
          payload: {
            status: data.updatePayoutForReservation.status
          }
        });
      }

    } catch (error) {
      dispatch({
        type: CHANGE_PAYOUT_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}