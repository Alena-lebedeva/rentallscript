import { gql } from 'react-apollo';

import {
  CURRENCY_RATES_FETCH_START,
  CURRENCY_RATES_FETCH_SUCCESS,
  CURRENCY_RATES_FETCH_ERROR,
  CHOSE_TO_CURRENCY_START,
  CHOSE_TO_CURRENCY_SUCCESS,
  CHOSE_TO_CURRENCY_ERROR
} from '../constants';

const query = gql`
  {
    Currency{
        base
        rates
    }
  }
`;

export function getCurrencyRates(toCurrency) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CURRENCY_RATES_FETCH_START,
    });

    try {

      let base, currencyRates;

      // Send request to fetch Currency Rates
      const { data } = await client.query({ query });
      if (data && data.Currency) {
        base = data.Currency.base;
        if (data.Currency.rates != null) {
          currencyRates = JSON.parse(data.Currency.rates);
        }
        dispatch({
          type: CURRENCY_RATES_FETCH_SUCCESS,
          payload: {
            base,
            to: toCurrency,
            rates: currencyRates
          }
        });

      }

    } catch (error) {
      dispatch({
        type: CURRENCY_RATES_FETCH_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}


export function choseToCurrency(toCurrency) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CHOSE_TO_CURRENCY_START,
    });

    try {

      dispatch({
        type: CHOSE_TO_CURRENCY_SUCCESS,
        payload: {
          to: toCurrency
        }
      });

      // remember locale for every new request
      if (process.env.BROWSER) {
        const maxAge = 3650 * 24 * 3600; // 10 years in seconds
        document.cookie = `currency=${toCurrency};path=/;max-age=${maxAge}`;
      }

    } catch (error) {
      dispatch({
        type: CHOSE_TO_CURRENCY_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}



