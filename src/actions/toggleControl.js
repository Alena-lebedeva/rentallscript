import { change } from 'redux-form';
import {
  SEARCH_FILTER_TOGGLE_OPEN,
  SEARCH_FILTER_TOGGLE_CLOSE
} from '../constants';

export function openSearchFilter() {

  return async (dispatch) => {
    dispatch({
      type: SEARCH_FILTER_TOGGLE_OPEN,
      payload: {
        filterToggle: true
      }
    });
    return true;
  };
};

export function closeSearchFilter() {

  return async (dispatch) => {
    dispatch({
      type: SEARCH_FILTER_TOGGLE_CLOSE,
      payload: {
        filterToggle: false
      }
    });
    dispatch(change('SearchForm', 'amenities', []));
    dispatch(change('SearchForm', 'spaces', []));
    dispatch(change('SearchForm', 'houseRules', []));
    return true;
  };
};


export function closeAndSubmitSearchFilter() {

  return async (dispatch) => {
    dispatch({
      type: SEARCH_FILTER_TOGGLE_CLOSE,
      payload: {
        filterToggle: false
      }
    });
    return true;
  };
};
