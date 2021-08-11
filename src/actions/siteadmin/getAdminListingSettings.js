import { gql } from 'react-apollo';

import {
  ADMIN_LOAD_LIST_SETTINGS_START,
  ADMIN_LOAD_LIST_SETTINGS_SUCCESS,
  ADMIN_LOAD_LIST_SETTINGS_ERROR
} from '../../constants';

const query = gql`
  query($typeId: Int) {
      getAdminListingSettings(typeId: $typeId){
      	id
      	typeName
        typeLabel
        fieldType
      	isEnable
      	step
        listSettings {
          id
          typeId
          itemName
          itemDescription
          otherItemName
          startValue
          endValue
          maximum
          minimum
          isEnable
        }
        status
    	}
  	}
`;

export function getAdminListingSettings(typeId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_LOAD_LIST_SETTINGS_START,
    });

    try {
      // Send Request to get listing data for admin panel
      const { data } = await client.query({
        query,
        variables: { typeId },
        fetchPolicy: 'network-only'
      });

      if (typeId != undefined && typeId != null) {
        if (!data && !data.getAdminListingSettings) {
          dispatch({
            type: ADMIN_LOAD_LIST_SETTINGS_ERROR,
          });
        } else {
          dispatch({
            type: ADMIN_LOAD_LIST_SETTINGS_SUCCESS,
            adminListSettingsData: data.getAdminListingSettings,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ADMIN_LOAD_LIST_SETTINGS_ERROR,
        payload: {
          error
        }
      });
      return false;
    }
    return true;
  };
}
