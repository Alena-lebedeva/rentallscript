import { gql } from 'react-apollo';

import {
  STORE_CURRENCY_RATES_START,
  STORE_CURRENCY_RATES_SUCCESS,
  STORE_CURRENCY_RATES_ERROR
} from '../constants';

const query = gql`
  query($rates: String, $base: String) {
    StoreCurrencyRates(rates: $rates, base: $base) {
        status
    }
  }
`;

export function storeCurrencyRates(rates, base) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: STORE_CURRENCY_RATES_START,
    });

    try {
      // Send request to store Currency Rates
      const { data } = await client.query({
        query,
        variables: { rates, base },
        fetchPolicy: 'network-only'
      });

      if (data && data.StoreCurrencyRates) {
        if (data.StoreCurrencyRates.status === 'success') {
          dispatch({
            type: STORE_CURRENCY_RATES_SUCCESS,
          });
        } else {
          dispatch({
            type: STORE_CURRENCY_RATES_ERROR,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: STORE_CURRENCY_RATES_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
