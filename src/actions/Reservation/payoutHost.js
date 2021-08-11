// Toaster
import { toastr } from 'react-redux-toastr';

import {
  ADMIN_PAYOUT_HOST_START,
  ADMIN_PAYOUT_HOST_SUCCESS,
  ADMIN_PAYOUT_HOST_ERROR,
} from '../../constants';

import { sendPaymentToHost } from '../../core/payment/payout/sendPaymentToHost';
// Helper
import { convert } from '../../helpers/currencyConvertion';
// Stripe
import { processStripePayment } from '../../core/payment/stripe/processStripePayment';

export function payoutHost(
  reservationId,
  destination,
  payoutId,
  amount,
  currency,
  paymentCurrency,
  userId,
  paymentMethodId,
  hostEmail
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_PAYOUT_HOST_START,
      payload: {
        loading: true,
        reservationId
      }
    });

    try {

      let rates = getState().currency.rates;
      let baseCurrency = getState().currency.base;
      let convertedAmount = convert(baseCurrency, rates, amount, currency, paymentCurrency);
      if (paymentMethodId == 1) { // Pay Pal
        const { status, errorMessage } = await sendPaymentToHost(
          reservationId,
          destination,
          payoutId,
          convertedAmount.toFixed(2),
          paymentCurrency,
          userId,
          paymentMethodId
        );

        if (status && (status === 'SUCCESS' || status === 'PENDING')) {
          dispatch({
            type: ADMIN_PAYOUT_HOST_SUCCESS,
            payload: {
              loading: false,
              completed: true
            }
          });
          toastr.success("Payment to Host", "Payment transferred to host successfully!");
        } else {
          if (errorMessage) {
            toastr.error("Payment to Host", errorMessage);
          } else {
            toastr.error("Payment to Host", "Payment to Host is failed, please try again with different currency");
          }
          dispatch({
            type: ADMIN_PAYOUT_HOST_ERROR,
            payload: {
              loading: false
            }
          });
        }
      } else { // Stripe
        let cardDetails = {};
        let reservationDetails = {
          reservationId,
          amount: convertedAmount.toFixed(2),
          currency: paymentCurrency,
          hostEmail,
          payoutId,
          userId,
          destination,
          transfer_group: 'Payout to Host'
        };
        const { status, errorMessage } = await processStripePayment(
          'payout',
          cardDetails,
          reservationDetails
        );

        if (status && status === 200) {
          dispatch({
            type: ADMIN_PAYOUT_HOST_SUCCESS,
            payload: {
              loading: false,
              completed: true
            }
          });
          toastr.success("Payment to Host", "Payment transferred to host successfully!");
        } else {
          toastr.error("Payment to Host", errorMessage);
          dispatch({
            type: ADMIN_PAYOUT_HOST_ERROR,
            payload: {
              loading: false
            }
          });
        }
      }

    } catch (error) {
      dispatch({
        type: ADMIN_PAYOUT_HOST_ERROR,
        payload: {
          error,
          loading: false
        }
      });
      return false;
    }

    return true;
  };
}