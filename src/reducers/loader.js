import {
  SET_LOADER_START,
  SET_LOADER_COMPLETE
} from '../constants';

export default function loader(state = {}, action) {
  switch (action.type) {
    case SET_LOADER_START:
      return {
        ...state,
        [action.payload.name]: action.payload.status,
      };

    case SET_LOADER_COMPLETE:
      return {
        ...state,
        [action.payload.name]: action.payload.status,
      };

    default:
      return state;
  }
}