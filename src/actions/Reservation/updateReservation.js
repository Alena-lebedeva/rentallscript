import { gql } from 'react-apollo';

import {
  UPDATE_RESERVATION_STATE_START,
  UPDATE_RESERVATION_STATE_SUCCESS,
  UPDATE_RESERVATION_STATE_ERROR
} from '../../constants';

const getAllReservationQuery = gql`
  query getAllReservation ($userType: String){
    getAllReservation(userType: $userType){
      reservationData {
        id
        reservationState
      }
    }
  }
`;

export function updateReservation(reservationId, actionType, userType, threadId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: UPDATE_RESERVATION_STATE_START,
    });

    try {

      let mutation = gql`
          mutation updateReservation(
            $reservationId: Int!, 
            $actionType: String!,
            $threadId: Int
          ){
              updateReservation(
                reservationId: $reservationId,
                actionType: $actionType,
                threadId: $threadId
              ) {
                  status
              }
          }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          reservationId,
          actionType,
          threadId
        },
        refetchQueries: [
          {
            query: getAllReservationQuery,
            variables: {
              userType
            },
          }
        ]
      });

      if (data && data.updateReservation && data.updateReservation.status === '200') {
        dispatch({
          type: UPDATE_RESERVATION_STATE_SUCCESS,
        });
      }

    } catch (error) {
      dispatch({
        type: UPDATE_RESERVATION_STATE_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}