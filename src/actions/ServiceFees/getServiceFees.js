import { gql } from 'react-apollo';

import {
  GET_SERVICE_FEES_START,
  GET_SERVICE_FEES_SUCCESS,
  GET_SERVICE_FEES_ERROR,
} from '../../constants';

const query = gql`
  query getServiceFees{
    getServiceFees{
        id
        guestType
        guestValue
        hostType
        hostValue
        currency
        status
    }
  }
`;

export function getServiceFees() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: GET_SERVICE_FEES_START,
    });

    try {

      const { data } = await client.query({ query });

      if (data && data.getServiceFees) {
        let guest = {
          type: data.getServiceFees.guestType,
          value: data.getServiceFees.guestValue,
          currency: data.getServiceFees.currency
        };

        let host = {
          type: data.getServiceFees.hostType,
          value: data.getServiceFees.hostValue,
          currency: data.getServiceFees.currency
        };

        dispatch({
          type: GET_SERVICE_FEES_SUCCESS,
          payload: {
            serviceFees: { guest, host }
          }
        });

      }

    } catch (error) {
      dispatch({
        type: GET_SERVICE_FEES_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}