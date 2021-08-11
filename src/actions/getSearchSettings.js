import { gql } from 'react-apollo';

import {
  GET_SEARCH_SETTINGS_START,
  GET_SEARCH_SETTINGS_SUCCESS,
  GET_SEARCH_SETTINGS_ERROR
} from '../constants';

const query = gql`
  {
    getSearchSettings {
      minPrice
      maxPrice
      priceRangeCurrency
    }
  }
`;

export function getSearchSettings() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: GET_SEARCH_SETTINGS_START,
    });

    try {

      const { data } = await client.query({ query, fetchPolicy: 'network-only' });

      if (data && data.getSearchSettings) {
        dispatch({
          type: GET_SEARCH_SETTINGS_SUCCESS,
          payload: {
            data: data.getSearchSettings
          }
        });

      } else {
        dispatch({
          type: GET_SEARCH_SETTINGS_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_SEARCH_SETTINGS_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
