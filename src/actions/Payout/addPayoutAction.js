import { gql } from 'react-apollo';
import { reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import history from '../../core/history';
import {
  ADD_PAYOUT_START,
  ADD_PAYOUT_SUCCESS,
  ADD_PAYOUT_ERROR,
} from '../../constants';

// Stripe
import { processStripePayment } from '../../core/payment/stripe/processStripePayment';

import { getPayouts } from '../../actions/Payout/getPayouts';

export function addPayout(
  methodId,
  payEmail,
  address1,
  address2,
  city,
  state,
  country,
  zipcode,
  currency,
  firstname,
  lastname,
  accountNumber,
  routingNumber,
  ssn4Digits,
  businessType) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADD_PAYOUT_START,
      payload: {
        payoutLoading: true
      }
    });

    try {

      let mutation = gql`
          mutation addPayout(
            $methodId: Int!, 
            $payEmail: String!,
            $address1: String,
            $address2: String,
            $city: String!,
            $state: String!,
            $country: String!,
            $zipcode: String!,
            $currency: String!,
            $last4Digits: Int,
            $isVerified: Boolean
          ){
              addPayout(
                methodId: $methodId,
                payEmail: $payEmail,
                address1: $address1,
                address2: $address2,
                city: $city,
                state: $state,
                country: $country,
                zipcode: $zipcode,
                currency: $currency,
                last4Digits: $last4Digits,
                isVerified: $isVerified
              ) {
                  id
                  methodId
                  userId
                  payEmail
                  last4Digits
                  address1
                  address2
                  city
                  state
                  country
                  zipcode
                  currency
                  createdAt
                  status
              }
          }
      `;

      if (methodId == 1) { // PayPal
        const { data } = await client.mutate({
          mutation,
          variables: {
            methodId,
            payEmail,
            address1,
            address2,
            city,
            state,
            country,
            zipcode,
            currency,
            isVerified: true
          }
        });

        await dispatch(getPayouts());

        if (data && data.addPayout) {
          dispatch({
            type: ADD_PAYOUT_SUCCESS,
            payload: {
              status: data.addPayout.status,
              payoutLoading: false
            }
          });
          dispatch(reset('PayoutForm'));
          history.push('/user/payout');
        }
      } else { // Stripe
        
        let userDetails = {
          payEmail
        };

        let bankDetails = {
          firstname,
          lastname,
          routingNumber,
          accountNumber,
          city,
          address1,
          zipcode,
          state,
          country,
          currency,
          businessType,
          ssn4Digits
        };

        const { status, errorMessage, accountId, isVerified } = await processStripePayment(
          'addPayout',
          userDetails,
          bankDetails
        );

        if (status === 200 && accountId) {
          dispatch({
            type: ADD_PAYOUT_SUCCESS,
            payload: {
              status,
              payoutLoading: false
            }
          });
        } else {
          toastr.error('Failed!', errorMessage);
          dispatch({
            type: ADD_PAYOUT_ERROR,
            payload: {
              errorMessage,
              payoutLoading: false
            }
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ADD_PAYOUT_ERROR,
        payload: {
          error,
          payoutLoading: false
        }
      });
      return false;
    }

    return true;
  };
}
