import { gql } from 'react-apollo';

import {
  USER_LOGOUT_START,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERROR,
  SET_RUNTIME_VARIABLE
} from '../constants';
import history from '../core/history';

const query = gql`
  query {
    userLogout {
    	status
    }
  }
`;

export function setUserLogout() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: USER_LOGOUT_START,
    });

    try {
      const { data } = await client.query({ query, fetchPolicy: 'network-only' });

      if (data.userLogout.status == "success") {

        // Redirect to Home page
        history.push('/');

        // Successully logged out
        dispatch({
          type: USER_LOGOUT_SUCCESS
        });

        // Update the Authentication status
        dispatch({
          type: SET_RUNTIME_VARIABLE,
          payload: {
            name: 'isAuthenticated',
            value: false,
          }
        });


      } else {
        dispatch({
          type: USER_LOGOUT_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_LOGOUT_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
