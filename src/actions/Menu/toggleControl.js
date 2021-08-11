import {
  OPEN_TOGGLE_MENU,
  CLOSE_TOGGLE_MENU,
} from '../../constants';

export function toggleOpen() {
  return {
    type: OPEN_TOGGLE_MENU,
    payload: {
      showMenu: true
    }
  };
}

export function toggleClose() {
  return {
    type: CLOSE_TOGGLE_MENU,
    payload: {
      showMenu: false
    }
  };
}