import { gql } from 'react-apollo';

import {
  SHOW_LIST_PHOTOS_START,
  SHOW_LIST_PHOTOS_SUCCESS,
  SHOW_LIST_PHOTOS_ERROR
} from '../constants';

const query = gql`
  query listPhotos($listId:Int!) {
    ShowListPhotos (listId:$listId) {
      id
      listId
      name
      type
      isCover
    }
  }
`;

export function getListPhotos(listId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SHOW_LIST_PHOTOS_START,
    });

    try {
      let id = Number(listId);
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId: id },
        fetchPolicy: 'network-only'
      });


      if (data && data.ShowListPhotos) {
        dispatch({
          type: SHOW_LIST_PHOTOS_SUCCESS,
          listPhotos: data.ShowListPhotos,
          photosCount: data.ShowListPhotos.length
        });
      } else {
        dispatch({
          type: SHOW_LIST_PHOTOS_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: SHOW_LIST_PHOTOS_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
