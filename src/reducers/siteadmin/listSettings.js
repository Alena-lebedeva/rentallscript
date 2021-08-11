import {
  ADMIN_LOAD_LIST_SETTINGS_SUCCESS
} from '../../constants';

export default function listSettings(state = {}, action) {
  switch (action.type) {
    case ADMIN_LOAD_LIST_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
