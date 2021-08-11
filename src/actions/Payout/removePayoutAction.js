import {gql} from 'react-apollo';

import {
  REMOVE_PAYOUT_START,
  REMOVE_PAYOUT_SUCCESS,
  REMOVE_PAYOUT_ERROR, 
} from '../../constants';

import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import { getPayouts } from './getPayouts';

import history from '../../core/history';

export function removePayout(id) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: REMOVE_PAYOUT_START,
    });

    dispatch(setLoaderStart('payoutRemove'));

    try {

      let mutation = gql `
          mutation removePayout(
            $id: Int!, 
          ){
              removePayout(
                id: $id
              ) {
                  status
              }
          }
      `;

      const {data} = await client.mutate({
        mutation,
        variables: {
          id
        }
      });

      if(data && data.removePayout) {
        await dispatch({
          type: REMOVE_PAYOUT_SUCCESS,
          payload: {
            status: data.removePayout.status
          }
        });

        await dispatch(setLoaderComplete('payoutRemove'));

        await dispatch(getPayouts());

        history.push('/user/payout');
      }

      await dispatch(setLoaderComplete('payoutRemove'));

    } catch (error) {
        dispatch({
          type: REMOVE_PAYOUT_ERROR,
          payload: {
            error
          }
        });
      dispatch(setLoaderComplete('payoutRemove'));
      return false;
    }

    return true;
  };
}
