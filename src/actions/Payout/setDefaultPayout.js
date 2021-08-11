import {gql} from 'react-apollo';

import {
  SET_DEFAULT_PAYOUT_START,
  SET_DEFAULT_PAYOUT_SUCCESS,
  SET_DEFAULT_PAYOUT_ERROR, 
} from '../../constants';

import { setLoaderStart, setLoaderComplete } from '../loader/loader';

import { getPayouts } from './getPayouts';

export function setDefaultPayout(id) {

  return async (dispatch, getState, { client }) => {
    
    dispatch({
      type: SET_DEFAULT_PAYOUT_START,
    });

    dispatch(setLoaderStart('payoutDefault'));

    try {

      let mutation = gql `
          mutation setDefaultPayout(
            $id: Int!, 
          ){
              setDefaultPayout(
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

      if(data && data.setDefaultPayout) {
        await dispatch({
          type: SET_DEFAULT_PAYOUT_SUCCESS,
          payload: {
            status: data.setDefaultPayout.status
          }
        });

        await dispatch(getPayouts());
      }

      await dispatch(setLoaderComplete('payoutDefault'));

    } catch (error) {
        dispatch({
          type: SET_DEFAULT_PAYOUT_ERROR,
          payload: {
            error
          }
        });

        dispatch(setLoaderComplete('payoutDefault'));
      return false;
    }

    return true;
  };
}