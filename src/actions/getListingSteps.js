import { gql } from 'react-apollo';
import { initialize } from 'redux-form';
import {
  GET_LISTING_STEPS_DATA_START,
  GET_LISTING_STEPS_DATA_SUCCESS,
  GET_LISTING_STEPS_DATA_ERROR,
  RESET_LISTING_STEPS_DATA_START,
  RESET_LISTING_STEPS_DATA_SUCCESS,
  RESET_LISTING_STEPS_DATA_ERROR
} from '../constants';
// Action
// For Step#1
import { getListingData } from './getListing';
// For Step#2
import { getListingDataStep2 } from './getListingDataStep2';
import { getListPhotos } from './getListPhotos';
import { getListingDataStep3 } from './getListingDataStep3';
import { getListingFieldsValues } from './getListingFieldsValues';
const query = gql`
  query ($listId:String!) {
    showListingSteps (listId:$listId) {
      id
      listId
      step1
      step2
      step3
      step4
      listing {
        id
        isReady
        isPublished
        user {
          id
          email
          userBanStatus
          userDeletedAt
        }
      }
    }
  }
`;
export function getListingSteps(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_STEPS_DATA_START,
      listingSteps: undefined,
      isExistingList: undefined,
      isLocationChosen: undefined,
      step1DataIsLoaded: undefined,
      step2DataIsLoaded: undefined,
      step3DataIsLoaded: undefined,
      initialValuesLoadedStep2: undefined,
      initialValuesLoadedStep3: undefined,
      photosCount: undefined,
      listPhotos: undefined,
      stepsLoading: true,
    });
    // For Adding new list
    if (listId === undefined || listId === null) {
      // Load initial data for step#1
      dispatch(getListingFieldsValues("1"));
      return true;
    }
    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId },
        fetchPolicy: 'network-only'
      });
      // Check if initial values already updated to the store
      const initialValuesLoaded = getState().location.initialValuesLoaded;
      const initialValuesLoadedStep2 = getState().location.initialValuesLoadedStep2;
      const initialValuesLoadedStep3 = getState().location.initialValuesLoadedStep3;
      // Check if list data already updated to the store
      const step1DataIsLoaded = getState().location.step1DataIsLoaded;
      const step2DataIsLoaded = getState().location.step2DataIsLoaded;
      const step3DataIsLoaded = getState().location.step3DataIsLoaded;
      if (data && data.showListingSteps) {
        // Assign steps data to a const
        const steps = data.showListingSteps;
        // Check if Step1Data is already loaded
        if (step1DataIsLoaded != true) {
          // Load data if Step#1 is either active or completed 
          if (steps.step1 === "active" || steps.step1 === "completed") {
            dispatch(getListingData(listId));
            // Load photos of the listing for step#2
            dispatch(getListPhotos(listId));
          } else {
            if (initialValuesLoaded != true) {
              // Load initial data for step#1
              dispatch(getListingFieldsValues("1"));
            }
          }
        }
        // Check if Step2Data is already loaded
        if (step2DataIsLoaded != true) {
          if (steps.step2 === "completed") {
            dispatch(getListingDataStep2(listId));
            // Load photos of the listing for step#2
            dispatch(getListPhotos(listId));
          } else {
            if (initialValuesLoadedStep2 != true) {
              // Load initial data for step#2
              dispatch(getListingFieldsValues("2", listId));
              // Load photos of the listing for step#2
              dispatch(getListPhotos(listId));
            }
          }
        }
        // Check if Step3Data is already loaded
        if (step3DataIsLoaded != true) {
          if (steps.step3 === "completed") {
            dispatch(getListingDataStep3(listId));
          } else {
            if (initialValuesLoadedStep3 != true) {
              // Load initial data for step#3
              dispatch(getListingFieldsValues("3", listId));
            }
          }
        }
        // Update List Steps on the store & mark it as existing list
        dispatch({
          type: GET_LISTING_STEPS_DATA_SUCCESS,
          listingSteps: data.showListingSteps,
          isExistingList: true,
          stepsLoading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_STEPS_DATA_ERROR,
        stepsLoading: false,
      });
      return false;
    }
    return true;
  };
}
export function resetListingSteps() {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: RESET_LISTING_STEPS_DATA_START,
      stepsLoading: false,
    });

    try {
      await dispatch(initialize('ListPlaceStep1', {}));
      await dispatch(initialize('ListPlaceStep2', {}));
      await dispatch(initialize('ListPlaceStep3', {}));

      await dispatch({
        type: RESET_LISTING_STEPS_DATA_SUCCESS,
        listingSteps: undefined,
        isExistingList: undefined,
        isLocationChosen: undefined,
        step1DataIsLoaded: undefined,
        step2DataIsLoaded: undefined,
        step3DataIsLoaded: undefined,
        initialValuesLoadedStep2: undefined,
        initialValuesLoadedStep3: undefined,
        photosCount: undefined,
        listPhotos: undefined,
        stepsLoading: false,
      });
    } catch (error) {
      await dispatch({
        type: RESET_LISTING_STEPS_DATA_ERROR,
        stepsLoading: false,
      });
      return false;
    }
    return true;
  };
}
