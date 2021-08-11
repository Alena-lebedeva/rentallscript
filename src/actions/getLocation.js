import { gql } from 'react-apollo';

import {
  GET_LOCATION_DATA_START,
  GET_LOCATION_DATA_SUCCESS,
  GET_LOCATION_DATA_ERROR,
  UPDATE_LOCATION_STATUS
} from '../constants';

import { initialize } from 'redux-form';

const query = gql`
  query ($address: String) {
    locationItem(address: $address) {
      street
      city
      state
      country
      zipcode
      lat
      lng
    }
  }
`;

export function getLocationData(address) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: GET_LOCATION_DATA_START,
      isLocationChosen: true,
    });

    try {
      // Send Request Google API get detailed address
      const { data } = await client.query({
        query,
        variables: { address },
        fetchPolicy: 'network-only'
      });

      // Collect Current form data
      const formData = getState().form.ListPlaceStep1.values

      // Combine Existing Values with location data
      const formValues = Object.assign({}, formData, data.locationItem);

      // Reinitialize the form values
      dispatch(initialize("ListPlaceStep1", formValues, true));

      // Dispatch a success action
      dispatch({
        type: GET_LOCATION_DATA_SUCCESS,
      });

    } catch (error) {
      dispatch({
        type: GET_LOCATION_DATA_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}

export function updateLocationStatus() {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LOCATION_STATUS,
      isLocationChosen: true
    });
  };
}
