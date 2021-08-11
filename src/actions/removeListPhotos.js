import { gql } from 'react-apollo';

import {
  REMOVE_LIST_PHOTOS_START,
  REMOVE_LIST_PHOTOS_SUCCESS,
  REMOVE_LIST_PHOTOS_ERROR
} from '../constants';
import { initialize, change } from 'redux-form';
// To show updated files
import { getListPhotos } from './getListPhotos';

const query = gql`
  query ($listId:Int!, $name:String) {
    RemoveListPhotos (listId:$listId, name: $name) {
      status
      photosCount
      iscoverPhotoDeleted
    }
  }
`;

export function removeListPhotos(listId, name, reload) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: REMOVE_LIST_PHOTOS_START,
    });

    try {
      // Remove file physically
      const resp = await fetch('/deletePhotos', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: name }),
        credentials: 'include',
      });

      const { status } = await resp.json();

      if (status) {

        // Send Request to remove a photo of a listing
        const { data } = await client.query({
          query,
          variables: { listId, name },
          fetchPolicy: 'network-only'
        });

        if (data && data.RemoveListPhotos) {
          if (data.RemoveListPhotos.iscoverPhotoDeleted) {
            await dispatch(change('ListPlaceStep2', 'coverPhoto', null));
          }
          dispatch({
            type: REMOVE_LIST_PHOTOS_SUCCESS,
            photosCount: data.RemoveListPhotos.photosCount
          });
          // Reload show image block
          if (reload) {
            dispatch(getListPhotos(listId));
          }
        }

      }
    } catch (error) {
      dispatch({
        type: REMOVE_LIST_PHOTOS_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
