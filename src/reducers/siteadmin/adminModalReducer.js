import {
  OPEN_LIST_SETTINGS_MODAL,
  CLOSE_LIST_SETTINGS_MODAL,
  OPEN_ADMIN_ROLES_MODAL,
  CLOSE_ADMIN_ROLES_MODAL,
  OPEN_ADMIN_USER_MODAL,
  CLOSE_ADMIN_USER_MODAL
} from '../../constants';

export default function adminModalStatus(state = {}, action) {
  switch (action.type) {

    case OPEN_LIST_SETTINGS_MODAL:
      return {
        ...state,
        listSettingsModal: action.listSettingsModal,
      };

    case CLOSE_LIST_SETTINGS_MODAL:
      return {
        ...state,
        listSettingsModal: action.listSettingsModal
      };

    case OPEN_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: action.payload.adminRolesModalType
      };

    case CLOSE_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: null
      };
    
    case OPEN_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: action.payload.adminUserModalType
      };

    case CLOSE_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: null
      };  

    default:
      return {
        ...state,
      };
  }
}
