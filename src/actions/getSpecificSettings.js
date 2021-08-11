import { gql } from 'react-apollo';

import {
  GET_LISTING_SPECIFIC_FIELDS_DATA_START,
  GET_LISTING_SPECIFIC_FIELDS_DATA_SUCCESS,
  GET_LISTING_SPECIFIC_FIELDS_DATA_ERROR
} from '../constants';

const query = gql`
  query ($id:Int!) {
    getListingSpecSettings (id:$id) {
      id
      typeName
      fieldType
      typeLabel
      step
      isEnable
      listSettings {
        id
        typeId
        itemName
        otherItemName
        maximum
        minimum
        startValue
        endValue
        isEnable
      }
      status
    }
  }
`;

export function getSpecificSettings(id) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: GET_LISTING_SPECIFIC_FIELDS_DATA_START,
    });

    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { id },
        fetchPolicy: 'network-only'
      });

      if (data && data.getListingSpecSettings) {
        dispatch({
          type: GET_LISTING_SPECIFIC_FIELDS_DATA_SUCCESS,
          settingsData: data.getListingSpecSettings,
        });
      } else {
        dispatch({
          type: GET_LISTING_SPECIFIC_FIELDS_DATA_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_SPECIFIC_FIELDS_DATA_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
