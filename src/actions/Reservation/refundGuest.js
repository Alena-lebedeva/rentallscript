// Toaster
import { toastr } from 'react-redux-toastr';

import {
  ADMIN_REFUND_GUEST_START,
  ADMIN_REFUND_GUEST_SUCCESS,
  ADMIN_REFUND_GUEST_ERROR,
} from '../../constants';

import { refundToGuest } from '../../core/payment/refund/refundToGuest';
// Helper
import { convert } from '../../helpers/currencyConvertion';

// Stripe
import { processStripePayment } from '../../core/payment/stripe/processStripePayment';

export function refundGuest(
  reservationId,
  receiverEmail,
  receiverId,
  payerEmail,
  payerId,
  amount,
  currency,
  paymentCurrency,
  paymentMethodId,
  transactionId
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_REFUND_GUEST_START,
      payload: {
        refundLoading: true,
        reservationId
      }
    });

    try {

      let rates = getState().currency.rates;
      let baseCurrency = getState().currency.base;
      let convertedAmount = 0;
      let currentCurrency = (getState().currency.to) ? getState().currency.to : getState().currency.base;
      if (paymentMethodId == 1) {
        // PayPal
        convertedAmount = convert(baseCurrency, rates, amount, currency, paymentCurrency);

        const { status } = await refundToGuest(
          reservationId, receiverEmail, receiverId, payerEmail, payerId, convertedAmount.toFixed(2), paymentCurrency
        );

        if (status && status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REFUND_GUEST_SUCCESS,
            payload: {
              refundLoading: false,
              completed: true
            }
          });
          toastr.success("Refund to Guest", "Payment transferred to Guest successfully!");
        } else {
          toastr.error("Refund to Guest", "Payment to Guest is failed, please try again with different currency");
          dispatch({
            type: ADMIN_REFUND_GUEST_ERROR,
            payload: {
              refundLoading: false
            }
          });
        }
      } else {
        // Stripe 
        convertedAmount = convert(baseCurrency, rates, amount, currency, currentCurrency);
        let cardDetails = {};
        let reservationDetails = {
          reservationId,
          amount: convertedAmount.toFixed(2),
          currency: currentCurrency,
          transactionId,
          payerEmail,
          customerId: receiverId
        };

        const { status, errorMessage } = await processStripePayment(
          'refund',
          cardDetails,
          reservationDetails
        );

        if (status === 200) {
          dispatch({
            type: ADMIN_REFUND_GUEST_SUCCESS,
            payload: {
              refundLoading: false,
              completed: true
            }
          });
          toastr.success("Refund to Guest", "Payment transferred to Guest successfully!");
        } else {
          toastr.error('Failed!', errorMessage);
          dispatch({
            type: ADMIN_REFUND_GUEST_ERROR,
            payload: {
              refundLoading: false
            }
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ADMIN_REFUND_GUEST_ERROR,
        payload: {
          error,
          refundLoading: false
        }
      });
      return false;
    }

    return true;
  };
}