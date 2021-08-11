import {
  LOCATION_UPLOAD_LOADER_START,
  LOCATION_UPLOAD_SUCCESS,
  LOCATION_UPLOAD_ERROR,
  REMOVE_LOCATION_SUCCESS,
  REMOVE_LOCATION_ERROR,
} from '../../constants';

export default function popularLocation(state = {}, action) {
  switch (action.type) {

    case LOCATION_UPLOAD_LOADER_START:
      return {
        ...state,
        locationUploaderLoading: action.payload.locationUploaderLoading,
      };

    case LOCATION_UPLOAD_SUCCESS:
      return {
        ...state,
        locationUploaderLoading: action.payload.locationUploaderLoading,
      };

    case LOCATION_UPLOAD_ERROR:
      return {
        ...state,
        locationUploaderLoading: action.payload.locationUploaderLoading,
      };

    case REMOVE_LOCATION_SUCCESS:
      return {
        ...state,
        locationUploaderLoading: action.payload.locationUploaderLoading,
        logodata: null,
      };

    case REMOVE_LOCATION_ERROR:
      return {
        ...state,
        locationUploaderLoading: action.payload.locationUploaderLoading,
      };


    default:
      return state;
  }
}
