import { gql } from 'react-apollo';
import fetch from '../../core/fetch';

import {
  LOCATION_UPLOAD_LOADER_START,
  LOCATION_UPLOAD_START,
  LOCATION_UPLOAD_SUCCESS,
  LOCATION_UPLOAD_ERROR,
  REMOVE_LOCATION_START,
  REMOVE_LOCATION_SUCCESS,
  REMOVE_LOCATION_ERROR,
} from '../../constants';

const query = gql`
query editPopularLocation ($id: Int!) {
  editPopularLocation (id: $id) {
      id
      location
      locationAddress
      isEnable
      image
  }
}
`;

export function startLocationUploaderLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: LOCATION_UPLOAD_LOADER_START,
      payload: {
        locationUploaderLoading: true
      }
    });
  };
}

export function endLocationUploaderLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: LOCATION_UPLOAD_LOADER_START,
      payload: {
        locationUploaderLoading: false
      }
    });
  };
}

export function doUploadLocation(image, filePath, oldPicture, id) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: LOCATION_UPLOAD_START });

    try {


      let mutation = gql`
        mutation uploadLocation(
          $id: Int,
          $image: String,
        ) {
          uploadLocation(
            id: $id,
            image: $image,
          ) {
              status
          }
        }
        `;

      // Send Request to create a record for location
      const { data } = await client.mutate({
        mutation,
        variables: { image, id },
        refetchQueries: [{ query, variables: { id } }]
      });

      if (data) {
        dispatch({
          type: LOCATION_UPLOAD_SUCCESS,
          payload: {
            locationUploaderLoading: false
          }
        });
        if (oldPicture != null) {
          await removeLocationFile(oldPicture);
        }

      }
    } catch (error) {
      dispatch({
        type: LOCATION_UPLOAD_ERROR,
        payload: {
          error,
          locationUploaderLoading: false
        }
      });

      return false;
    }

    return true;
  };

}


export function doRemoveLocation(image, id) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: REMOVE_LOCATION_START });
    dispatch(startLocationUploaderLoader());

    try {

      let mutation = gql`
      mutation removeLocation(
        $id: Int!,
        $image: String,
      ) {
        removeLocation(
          id: $id,
          image: $image,
        ) {
            status
        }
      }
      `;

      // Send Request to create a record for location
      const { data } = await client.mutate({
        mutation,
        variables: { image, id },
        refetchQueries: [{ query, variables: { id } }]
      });

      if (data) {
        dispatch({
          type: REMOVE_LOCATION_SUCCESS,
          payload: {
            locationUploaderLoading: false
          }
        });
        await removeLocationFile(image);
      }

    } catch (error) {
      dispatch({
        type: REMOVE_LOCATION_ERROR,
        payload: {
          error,
          locationUploaderLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

async function removeLocationFile(image) {
  try {
    const resp = await fetch('/removeLocationFile', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image
      }),
      credentials: 'include',
    });

    const { status } = await resp.json();

    if (status) {
      console.log('status from remove location file', status);
    }

  } catch (error) {
    console.log('error from remove file', error);

    return false;
  }

  return true;
}