import { gql } from 'react-apollo';
import {
  BOOKING_PAYMENT_FOR_CANCEL_START,
  BOOKING_PAYMENT_FOR_CANCEL_SUCCESS,
  BOOKING_PAYMENT_FOR_CANCEL_ERROR,
} from '../../constants';

import { sendPayment } from '../../core/payment/sendPayment';
// Helper
import { convert } from '../../helpers/currencyConvertion';

export function makePaymentForCancel(
  reservationId,
  amount,
  currency,
  paymentCurrency,
  title
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: BOOKING_PAYMENT_FOR_CANCEL_START,
      payload: {
        paymentLoading: true
      }
    });

    try {
      let rates = getState().currency.rates;
      let baseCurrency = getState().currency.base;
      let convertedAmount = convert(baseCurrency, rates, amount, currency, paymentCurrency);
      sendPayment(reservationId, convertedAmount.toFixed(2), paymentCurrency, title);

      dispatch({
        type: BOOKING_PAYMENT_FOR_CANCEL_SUCCESS
      });

    } catch (error) {
      dispatch({
        type: BOOKING_PAYMENT_FOR_CANCEL_ERROR,
        payload: {
          error,
          paymentLoading: false
        }
      });
      return false;
    }
    return true;
  };
}

