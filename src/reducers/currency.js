import {
  GET_CURRENCIES_SUCCESS,
  CURRENCY_RATES_FETCH_SUCCESS,
  CHOSE_TO_CURRENCY_SUCCESS
} from '../constants';

export default function currency(state = {}, action) {
  switch (action.type) {

    case GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        availableCurrencies: action.availableCurrencies,
      };

    case CURRENCY_RATES_FETCH_SUCCESS:
      return {
        ...state,
        base: action.payload.base,
        to: action.payload.to,
        rates: action.payload.rates
      };

    case CHOSE_TO_CURRENCY_SUCCESS:
      return {
        ...state,
        to: action.payload.to,
      };

    default:
      return state;
  }
}
