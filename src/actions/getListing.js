import { gql } from 'react-apollo';
import {
  GET_LISTING_DATA_START,
  GET_LISTING_DATA_SUCCESS,
  GET_LISTING_DATA_ERROR
} from '../constants';
import { initialize } from 'redux-form';
const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      country
      street
      buildingName
      city
      state
      zipcode
      lat
      lng
      isMapTouched
      bedrooms
      residenceType
      beds
      personCapacity
      bathrooms
      user {
        id
        email
        userBanStatus
        profile{
          firstName
          lastName
          dateOfBirth
        }
      }
      userAmenities {
        amenitiesId
        listsettings{
          itemName
          settingsType {
            typeName
          }
        }
      }
      userSafetyAmenities {
        safetyAmenitiesId
        listsettings{
          itemName
          settingsType {
            typeName
          }
        }
      }
      userSpaces {
        spacesId
        listsettings{
          itemName
          settingsType {
            typeName
          }
        }
      }
      settingsData {
        id
        settingsId
        listsettings {
          id
          itemName
          settingsType {
            typeName
          }
        }
      }
      userBedsTypes{
        id
        listId
        bedCount
        bedType
      }
    }
  }
`;
export function getListingData(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_DATA_START,
    });
    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, preview: true },
        fetchPolicy: 'network-only',
      });
      let formValues = null;
      let settingFieldsData = {};
      const amenities = [];
      const safetyAmenities = [];
      const spaces = [];

      let bedTypes = [];
      if (data && data.UserListing) {
        // Preparing for list settings data
        data.UserListing.settingsData.map((item, value) => {
          settingFieldsData[item.listsettings.settingsType.typeName] = item.settingsId;
        });
        // Preparing for user amenities
        if (data.UserListing.userAmenities.length > 0) {
          data.UserListing.userAmenities.map((item, value) => {
            amenities.push(parseInt(item.amenitiesId));
          });
          settingFieldsData = Object.assign({}, settingFieldsData, { amenities });
        }
        // Preparing for user safety amenities
        if (data.UserListing.userSafetyAmenities.length > 0) {
          data.UserListing.userSafetyAmenities.map((item, value) => {
            safetyAmenities.push(parseInt(item.safetyAmenitiesId));
          });
          settingFieldsData = Object.assign({}, settingFieldsData, { safetyAmenities });
        }
        // Preparing for User Spaces
        if (data.UserListing.userSpaces.length > 0) {
          data.UserListing.userSpaces.map((item, value) => {
            spaces.push(parseInt(item.spacesId));
          });
          settingFieldsData = Object.assign({}, settingFieldsData, { spaces });
        }

        bedTypes = data.UserListing.userBedsTypes;
        settingFieldsData = Object.assign({}, settingFieldsData, { bedTypes });

        // Combining values for initializing the edit form
        formValues = Object.assign({}, data.UserListing, settingFieldsData);
        if (formValues != null) {
          // Reinitialize the form values
          dispatch(initialize('ListPlaceStep1', formValues, true));
          // Dispatch a success action
          dispatch({
            type: GET_LISTING_DATA_SUCCESS,
            step1DataIsLoaded: true,
            isExistingList: true,
            initialValuesLoaded: false,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_DATA_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
