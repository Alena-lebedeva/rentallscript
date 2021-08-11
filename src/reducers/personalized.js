import { SET_PERSONALIZED_VALUES } from '../constants';

export default function personalized(state = {}, action) {
  switch (action.type) {
    case SET_PERSONALIZED_VALUES:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
