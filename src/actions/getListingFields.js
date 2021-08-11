import { gql } from 'react-apollo';

import {
  GET_LISTING_FIELDS_DATA_START,
  GET_LISTING_FIELDS_DATA_SUCCESS,
  GET_LISTING_FIELDS_DATA_ERROR
} from '../constants';

const query = gql`
  {
    getListingSettings {
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
        itemDescription
        otherItemName
        maximum
        minimum
        startValue
        endValue
        isEnable
      }
    }
  }
`;

export function getListingFields() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: GET_LISTING_FIELDS_DATA_START,
    });

    try {
      // Send Request to get listing data
      const { data } = await client.query({ query, fetchPolicy: 'network-only' });

      let listingFields = {};

      if (!data && !data.getListingSettings) {
        dispatch({
          type: GET_LISTING_FIELDS_DATA_ERROR,
        });
      } else {
        data.getListingSettings.map((item, key) => {
          listingFields[item.typeName] = item.listSettings;
        })
        dispatch({
          type: GET_LISTING_FIELDS_DATA_SUCCESS,
          listingFields: listingFields
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_FIELDS_DATA_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
