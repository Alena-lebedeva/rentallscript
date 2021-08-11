import {
  GET_LISTING_DATA_STEP3_SUCCESS,
  IMPORT_CALENDAR_START,
  IMPORT_CALENDAR_SUCCESS,
  IMPORT_CALENDAR_ERROR,
  DELETE_IMPORT_CALENDAR_START,
  DELETE_IMPORT_CALENDAR_SUCCESS,
  DELETE_IMPORT_CALENDAR_ERROR,
  GET_LISTING_DETAILS_START,
  GET_LISTING_DETAILS_SUCCESS,
  GET_LISTING_DETAILS_ERROR
} from '../constants';

export default function calendar(state = {}, action) {
  switch (action.type) {

    case GET_LISTING_DATA_STEP3_SUCCESS:
      return {
        ...state,
        data: action.calendars,
      };

    case IMPORT_CALENDAR_START:
      return {
        ...state,
        importCalLoading: action.payload.importCalLoading
      };

    case IMPORT_CALENDAR_SUCCESS:
      return {
        ...state,
        data: action.payload.calendars,
        importCalLoading: action.payload.importCalLoading
      };

    case IMPORT_CALENDAR_ERROR:
      return {
        ...state,
        importCalLoading: action.payload.importCalLoading
      };

    case DELETE_IMPORT_CALENDAR_START:
      return {
        ...state,
        importCalLoading: action.payload.importCalLoading
      };

    case DELETE_IMPORT_CALENDAR_SUCCESS:
      return {
        ...state,
        data: action.payload.calendars,
        importCalLoading: action.payload.importCalLoading
      };

    case DELETE_IMPORT_CALENDAR_ERROR:
      return {
        ...state,
        importCalLoading: action.payload.importCalLoading
      };

    case GET_LISTING_DETAILS_START:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };

    case GET_LISTING_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        stepTwoDetails: action.payload.stepTwoDetails
      };

    case GET_LISTING_DETAILS_ERROR:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };

    default:
      return state;
  }
}
