import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import {
  SEND_FORGOT_PASSWORD_START,
  SEND_FORGOT_PASSWORD_SUCCESS,
  SEND_FORGOT_PASSWORD_ERROR,
} from '../../constants';

import { closeForgotPasswordModal } from '../modalActions';

export function sendForgotLink(email) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SEND_FORGOT_PASSWORD_START,
    });

    dispatch(closeForgotPasswordModal());

    try {

      let mutation = gql`
        mutation sendForgotPassword($email: String!) {
          sendForgotPassword (email: $email) {
            status
          }
        }
      `;

      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          email
        }
      });

      if (data && data.sendForgotPassword) {

        if (data.sendForgotPassword.status === 'notAvailable') {
          toastr.error("Send Reset Link Failed", "No account exists for the given email id");
          return false;
        }
        if (data.sendForgotPassword.status === '400') {
          toastr.error("Send Reset Link Failed", "Something went wrong, please try again later");
          return false;
        }

        toastr.success("Reset Link Sent to your email", "Reset link email is on its way to your inbox");
        
        dispatch({
          type: SEND_FORGOT_PASSWORD_SUCCESS,
        });
      }

    } catch (error) {
      dispatch({
        type: SEND_FORGOT_PASSWORD_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}