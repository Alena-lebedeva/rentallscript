import {
  OPEN_WISH_LIST_GROUP_MODAL,
  CLOSE_WISH_LIST_GROUP_MODAL,
  OPEN_WISH_LIST_MODAL,
  CLOSE_WISH_LIST_MODAL
} from '../../constants';

import { initialize } from 'redux-form';
import {
  openLoginModal
} from '../../actions/modalActions';

export function openAddWishListGroupModal(initialData, formName) {

  return (dispatch, getState) => {

    // Reinitialize the form values
    dispatch(initialize(formName, initialData, true));

    dispatch({
      type: OPEN_WISH_LIST_GROUP_MODAL,
      wishListGroupModalOpen: true,
    });
  };

}

export function openEditWishListGroupModal(initialData) {

  return (dispatch, getState) => {

    // Reinitialize the form values
    dispatch(initialize("EditListSettingsForm", initialData, true));

    dispatch({
      type: OPEN_WISH_LIST_GROUP_MODAL,
      wishListGroupModalOpen: true,
    });
  };

}

export function closeWishListGroupModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_WISH_LIST_GROUP_MODAL,
      wishListGroupModalOpen: false
    });
  };

}

export function openWishListModal(listId) {

  return (dispatch, getState) => {
    let isAuthenticated = getState().runtime.isAuthenticated;

    if (isAuthenticated) {
      dispatch({
        type: OPEN_WISH_LIST_MODAL,
        payload: {
          wishListModalOpen: true,
          listId: listId
        }
      });
    } else {
      dispatch(openLoginModal());
    }
  };

}

export function closeWishListModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_WISH_LIST_MODAL,
      payload: {
        wishListModalOpen: false
      }
    });
  };

}
