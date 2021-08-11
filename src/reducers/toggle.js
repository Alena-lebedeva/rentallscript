import {
  SEARCH_FILTER_TOGGLE_OPEN,
  SEARCH_FILTER_TOGGLE_CLOSE,
  OPEN_TOGGLE_MENU,
  CLOSE_TOGGLE_MENU,
} from '../constants';

export default function toggle(state = {}, action) {
  switch (action.type) {
    case SEARCH_FILTER_TOGGLE_OPEN:
      return {
        ...state,
        filterToggle: action.payload.filterToggle,
      };

    case SEARCH_FILTER_TOGGLE_CLOSE:
      return {
        ...state,
        filterToggle: action.payload.filterToggle,
      };

    case OPEN_TOGGLE_MENU:
      return {
        ...state,
        showMenu: action.payload.showMenu,
      };

    case CLOSE_TOGGLE_MENU:
      return {
        ...state,
        showMenu: action.payload.showMenu,
      };

    default:
      return state;
  }
}