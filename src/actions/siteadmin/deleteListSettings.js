import { gql } from 'react-apollo';

import {
  DELETE_LIST_SETTINGS_START,
  DELETE_LIST_SETTINGS_SUCCESS,
  DELETE_LIST_SETTINGS_ERROR,
  CLOSE_LIST_SETTINGS_MODAL
} from '../../constants';
import { getAdminListingSettings } from './getAdminListingSettings';

// Toaster
import { toastr } from 'react-redux-toastr';

const query = gql`
  query($id:Int) {
    deleteListSettings(id: $id){
      status
      }
    }
  `;

export function deleteListSettings(id, typeId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: DELETE_LIST_SETTINGS_START,
    });

    try {

      const { data } = await client.query({
        query,
        variables: { id },
        fetchPolicy: 'network-only'
      });

      if (data.deleteListSettings.status === "success") {

        dispatch({
          type: CLOSE_LIST_SETTINGS_MODAL,
        });

        dispatch({
          type: DELETE_LIST_SETTINGS_SUCCESS,
        });

        toastr.success('Delete Setting Success', "Setting is deleted successfully");

        dispatch(getAdminListingSettings(typeId));

      } else {
        if (data.deleteListSettings.status === '500') {
          toastr.error('Delete Setting Failed', "It seems some listings are using this setting, you can disable it to prevent from others to use this in future");
          dispatch({
            type: CLOSE_LIST_SETTINGS_MODAL,
          });
        }
        dispatch({
          type: DELETE_LIST_SETTINGS_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: DELETE_LIST_SETTINGS_ERROR,
        payload: {
          error
        }
      });
    }
  };
}
