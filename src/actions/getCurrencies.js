import { gql } from 'react-apollo';

import {
  GET_CURRENCIES_START,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR
} from '../constants';

const query = gql`
    {
      getCurrencies {
        id
        symbol
        isEnable
        isPayment
        isBaseCurrency
        status
      }
    }
`;

export function getCurrenciesData() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: GET_CURRENCIES_START,
    });

    try {
      // Send Request to get listing data
      const { data } = await client.query({ query, fetchPolicy: 'network-only' });

      if (data && data.getCurrencies) {
        dispatch({
          type: GET_CURRENCIES_SUCCESS,
          availableCurrencies: data.getCurrencies
        });
      }
    } catch (error) {
      dispatch({
        type: GET_CURRENCIES_ERROR,
      });
      return false;
    }

    return true;
  };
}
