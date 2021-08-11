import {
  LOADING_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_SUCCESS,
  GET_SEARCH_SETTINGS_SUCCESS,
} from '../constants';

export default function search(state = {}, action) {
  switch (action.type) {

    case LOADING_SEARCH_RESULTS:
      return {
        ...state,
        isResultLoading: action.payload.isResultLoading,
      };

    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        data: action.payload.data.results,
        count: Number(action.payload.data.count),
        isResultLoading: action.payload.isResultLoading,
      };

    case GET_SEARCH_SETTINGS_SUCCESS:
      return {
        ...state,
        searchSettings: action.payload.data
      };
    default:
      return state;
  }
}