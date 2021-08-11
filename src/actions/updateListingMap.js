import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import {
  UPDATE_LISTING_MAP_START,
  UPDATE_LISTING_MAP_SUCCESS,
  UPDATE_LISTING_MAP_ERROR
} from '../constants';

import { change, submit } from 'redux-form';
import history from '../core/history';

const query = gql`
  query ($address: String) {
    locationItem(address: $address) {
      lat
      lng
      status
    }
  }
`;

export function updateListingMap(isHeader) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: UPDATE_LISTING_MAP_START,
      payload: {
        mapUpdateLoading: true
      }
    });

    try {

      // Collect Current form data
      const formData = getState().form.ListPlaceStep1.values;

      // Collect form initial values
      const formInitialData = getState().form.ListPlaceStep1.initial;

      // Get Country, Street, City, State, Zipcode
      const locationData = {
        "country": formData.country,
        "street": formData.street,
        "city": formData.city,
        "state": formData.state,
        "zipcode": formData.zipcode,
      };
      const InitialLocationData = {
        "country": formInitialData.country,
        "street": formInitialData.street,
        "city": formInitialData.city,
        "state": formInitialData.state,
        "zipcode": formInitialData.zipcode,
      };

      let address;
      /*if(JSON.stringify(locationData) === JSON.stringify(InitialLocationData)) {
        if(isHeader){
          history.push("home");
        } else {
          // Redirect to Map page
          history.push("map");
        }
        
      } else {*/
      address = `${locationData.street},${locationData.city},${locationData.state},${locationData.zipcode},${locationData.country},`;

      // Send Request Google API get detailed address
      const { data } = await client.query({
        query,
        variables: { address },
        fetchPolicy: 'network-only'
      });

      // Change Value of lat & lng
      dispatch(change("ListPlaceStep1", "lat", data.locationItem.lat));
      dispatch(change("ListPlaceStep1", "lng", data.locationItem.lng));
      if (data && data.locationItem) {
        if (data.locationItem.status !== 200) {
          toastr.error("Invalid Address!", "Your address seems to be invalid, please go back to edit your address!");
          dispatch({
            type: UPDATE_LISTING_MAP_SUCCESS,
            payload: {
              mapUpdateLoading: false
            }
          });
          return false;
        }
      }
      if (isHeader) {
        //history.push("home");
        // Instead of redirecting to home, We have submit(update) the data
        await dispatch(submit('ListPlaceStep1'));
      } else {
        // Redirect to Map page
        history.push("map");
      }
      /*}*/

      // Dispatch a success action
      dispatch({
        type: UPDATE_LISTING_MAP_SUCCESS,
        payload: {
          mapUpdateLoading: false
        }
      });

    } catch (error) {
      dispatch({
        type: UPDATE_LISTING_MAP_ERROR,
        payload: {
          error,
          mapUpdateLoading: false
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
