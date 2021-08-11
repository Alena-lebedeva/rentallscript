import {
  SHOW_SEARCH_RESULTS_MAP,
  SHOW_SEARCH_RESULTS,
  SHOW_SEARCH_FORM
} from '../constants';

export default function mobileSearch(state = {}, action) {
  switch (action.type) {
    case SHOW_SEARCH_RESULTS_MAP:
      return {
        ...state,
        data: {
          searchMap: action.payload.searchMap,
          searchResults: action.payload.searchResults,
          searchForm: action.payload.searchForm,
          searchFilter: action.payload.searchFilter
        }
      };

    case SHOW_SEARCH_RESULTS:
      return {
        ...state,
        data: {
          searchMap: action.payload.searchMap,
          searchResults: action.payload.searchResults,
          searchForm: action.payload.searchForm,
          searchFilter: action.payload.searchFilter
        }
      };

    case SHOW_SEARCH_FORM:
      return {
        ...state,
        data: {
          searchMap: action.payload.searchMap,
          searchResults: action.payload.searchResults,
          searchForm: action.payload.searchForm,
          searchFilter: action.payload.searchFilter
        }
      };

    default:
      return state;
  }
}