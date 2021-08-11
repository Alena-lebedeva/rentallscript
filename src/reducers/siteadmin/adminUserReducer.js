import {
  GET_ADMIN_USER_SUCCESS
} from '../../constants';

export default function adminPrevileges(state = {}, action) {
  switch (action.type) {

    case GET_ADMIN_USER_SUCCESS:
      return {
        ...state,
        privileges: action.payload.adminPrivileges
      };

    default:
      return {
        ...state,
      };
  }
}
