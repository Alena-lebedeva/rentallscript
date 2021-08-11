import {
  GET_LOCATION_DATA_START,
  UPDATE_LOCATION_STATUS,
  GET_LISTING_DATA_SUCCESS,
  GET_LISTING_STEPS_DATA_START,
  GET_LISTING_STEPS_DATA_SUCCESS,
  GET_LISTING_STEPS_DATA_ERROR,
  GET_LISTING_FIELDS_INTIAL_VALUES_SUCCESS,
  GET_LISTING_DATA_STEP2_SUCCESS,
  GET_LISTING_DATA_STEP3_SUCCESS,
  MANAGE_LISTING_STEPS_DATA_SUCCESS,
  SHOW_LIST_PHOTOS_SUCCESS,
  CREATE_LIST_PHOTOS_SUCCESS,
  REMOVE_LIST_PHOTOS_SUCCESS,
  UPDATE_LISTING_MAP_START,
  UPDATE_LISTING_MAP_SUCCESS,
  UPDATE_LISTING_MAP_ERROR,
  MANANGE_LISTING_PUBLISH_STATUS_START,
  MANANGE_LISTING_PUBLISH_STATUS_ERROR,
  MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
} from '../constants';

export default function location(state = {}, action) {
  switch (action.type) {

    case GET_LOCATION_DATA_START:
      return {
        ...state,
        isLocationChosen: action.isLocationChosen,
      };

    case UPDATE_LOCATION_STATUS:
      return {
        ...state,
        isLocationChosen: action.isLocationChosen
      };

    case GET_LISTING_STEPS_DATA_START:
      return {
        ...state,
        listingSteps: action.listingSteps,
        isExistingList: action.isExistingList,
        isLocationChosen: action.isLocationChosen,
        step1DataIsLoaded: action.step1DataIsLoaded,
        step2DataIsLoaded: action.step2DataIsLoaded,
        step3DataIsLoaded: action.step3DataIsLoaded,
        initialValuesLoadedStep2: action.initialValuesLoadedStep2,
        initialValuesLoadedStep3: action.initialValuesLoadedStep3,
        photosCount: action.photosCount,
        listPhotos: action.listPhotos,
        stepsLoading: action.stepsLoading
      };

    case GET_LISTING_STEPS_DATA_ERROR:
      return {
        ...state,
        stepsLoading: action.stepsLoading
      };

    case GET_LISTING_STEPS_DATA_SUCCESS:
      return {
        ...state,
        listingSteps: action.listingSteps,
        isExistingList: action.isExistingList
      };

    case MANANGE_LISTING_PUBLISH_STATUS_START:
      return {
        ...state,
        publishListLoading: action.payload.publishListLoading,
      };

    case MANANGE_LISTING_PUBLISH_STATUS_ERROR:
      return {
        ...state,
        publishListLoading: action.payload.publishListLoading,
      };
    case MANANGE_LISTING_PUBLISH_STATUS_SUCCESS:
      return {
        ...state,
        listingSteps: action.payload.listingSteps,
        publishListLoading: action.payload.publishListLoading,
      };

    case GET_LISTING_DATA_SUCCESS:
      return {
        ...state,
        step1DataIsLoaded: action.step1DataIsLoaded,
        isExistingList: action.isExistingList,
        initialValuesLoaded: action.initialValuesLoaded,
        stepsLoading: action.stepsLoading
      };


    case GET_LISTING_DATA_STEP2_SUCCESS:
      return {
        ...state,
        step2DataIsLoaded: action.step2DataIsLoaded,
        isExistingList: action.isExistingList
      };

    case GET_LISTING_DATA_STEP3_SUCCESS:
      return {
        ...state,
        step3DataIsLoaded: action.step3DataIsLoaded,
        isExistingList: action.isExistingList,
      };

    case MANAGE_LISTING_STEPS_DATA_SUCCESS:
      return {
        ...state,
        listingSteps: action.listingSteps
      };

    case GET_LISTING_FIELDS_INTIAL_VALUES_SUCCESS:
      return {
        ...state,
        initialValuesLoaded: action.initialValuesLoaded,
        initialValuesLoadedStep2: action.initialValuesLoadedStep2,
        initialValuesLoadedStep3: action.initialValuesLoadedStep3,
      };

    case CREATE_LIST_PHOTOS_SUCCESS:
      return {
        ...state,
        photosCount: action.photosCount
      };

    case REMOVE_LIST_PHOTOS_SUCCESS:
      return {
        ...state,
        photosCount: action.photosCount
      };

    case SHOW_LIST_PHOTOS_SUCCESS:
      return {
        ...state,
        listPhotos: action.listPhotos,
        photosCount: action.photosCount
      };

    case UPDATE_LISTING_MAP_START:
      return {
        ...state,
        mapUpdateLoading: action.payload.mapUpdateLoading
      };

    case UPDATE_LISTING_MAP_SUCCESS:
      return {
        ...state,
        mapUpdateLoading: action.payload.mapUpdateLoading
      };

    case UPDATE_LISTING_MAP_ERROR:
      return {
        ...state,
        listPhotos: action.listPhotos,
        mapUpdateLoading: action.payload.mapUpdateLoading
      };

    default:
      return state;
  }
}
