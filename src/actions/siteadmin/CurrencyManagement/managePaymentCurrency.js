import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import {
  ADMIN_MANAGE_PAYMENT_CURRENCY_START,
  ADMIN_MANAGE_PAYMENT_CURRENCY_SUCCESS,
  ADMIN_MANAGE_PAYMENT_CURRENCY_ERROR,
} from '../../../constants';

import getAllCurrencyQuery from './getAllCurrency.graphql';

export function managePaymentCurrency(currencyId, type) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_MANAGE_PAYMENT_CURRENCY_START,
    });

    try {

      let mutation = gql`
          mutation managePaymentCurrency(
            $currencyId: Int!, 
            $type: String!
          ){
              managePaymentCurrency(
                currencyId: $currencyId, 
                type: $type
              ) {
                  status
              }
          }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          currencyId,
          type
        },
        refetchQueries: [{ query: getAllCurrencyQuery }]
      });

      if (data && data.managePaymentCurrency) {
        dispatch({
          type: ADMIN_MANAGE_PAYMENT_CURRENCY_SUCCESS,
          payload: {
            status: data.managePaymentCurrency.status
          }
        });
        toastr.success("Success!", "Payment Currency changes are done");
      }

    } catch (error) {
      dispatch({
        type: ADMIN_MANAGE_PAYMENT_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      toastr.error("Failed!", "Failed to change Payment Currency status");
      return false;
    }

    return true;
  };
}