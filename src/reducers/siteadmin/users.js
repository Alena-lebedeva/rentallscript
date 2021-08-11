import {
  ADMIN_DELETE_USER_START
} from '../../constants';

export default function userManagement(state = {}, action) {
  switch (action.type) {
    case ADMIN_DELETE_USER_START:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
