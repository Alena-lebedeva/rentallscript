import { gql } from 'react-apollo';

import {
  GET_HOME_BANNER_START,
  GET_HOME_BANNER_SUCCESS,
  GET_HOME_BANNER_ERROR
} from '../constants';

const query = gql`
    {
        getHomeBanner {
            id
            name
        }
    }
`;

export function getHomeBannerImages() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: GET_HOME_BANNER_START,
    });

    try {

      // Send Request to get listing data
      const { data } = await client.query({
        query,
        fetchPolicy: 'network-only'
      });

      if (data) {
        dispatch({
          type: GET_HOME_BANNER_SUCCESS,
          data: data,
        });
      } else {
        dispatch({
          type: GET_HOME_BANNER_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_HOME_BANNER_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
