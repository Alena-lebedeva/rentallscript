import {
  SET_STICKY_TOP,
  SET_STICKY_BOTTOM
} from '../constants';

export default function sticky(state = {}, action) {
  switch (action.type) {

    case SET_STICKY_TOP:
      return {
        ...state,
        stickyTop: action.payload.stickyTop
      };

    case SET_STICKY_BOTTOM:
      return {
        ...state,
        stickyBottom: action.payload.stickyBottom
      };

    default:
      return {
        ...state,
      };
  }
}
