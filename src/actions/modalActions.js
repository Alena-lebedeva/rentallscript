import {
  OPEN_LONGIN_MODAL,
  CLOSE_LONGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  OPEN_REPORT_USER_MODAL,
  CLOSE_REPORT_USER_MODAL,
  OPEN_THANK_YOU_MODAL,
  CLOSE_THANK_YOU_MODAL,
  OPEN_SOCIAL_SHARE_MODAL,
  CLOSE_SOCIAL_SHARE_MODAL,
  OPEN_HEADER_MODAL,
  CLOSE_HEADER_MODAL
} from '../constants';
import { toggleClose } from './Menu/toggleControl';

export function openLoginModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_LONGIN_MODAL,
      isLoginModalOpen: true,
      isSignupModalOpen: false,
      isForgotPasswordOpen: false
    });
    dispatch(toggleClose());
  };

}

export function closeLoginModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_LONGIN_MODAL,
      isLoginModalOpen: false
    });
    dispatch(toggleClose());
  };

}


export function openSignupModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SIGNUP_MODAL,
      isSignupModalOpen: true,
      isLoginModalOpen: false
    });
  };

}

export function closeSignupModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SIGNUP_MODAL,
      isSignupModalOpen: false
    });
  };

}

export function openForgotPasswordModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_FORGOT_PASSWORD_MODAL,
      isForgotPasswordOpen: true,
      isLoginModalOpen: false
    });
  };

}

export function closeForgotPasswordModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_FORGOT_PASSWORD_MODAL,
      isForgotPasswordOpen: false
    });
  };

}

export function openReportUserModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_REPORT_USER_MODAL,
      payload: {
        isReportUserModalOpen: true,
      }
    });
  };

}

export function closeReportUserModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_REPORT_USER_MODAL,
      payload: {
        isReportUserModalOpen: false
      }
    });
  };

}

export function openThankYouModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_THANK_YOU_MODAL,
      payload: {
        isThankYouModalOpen: true,
        isReportUserModalOpen: false
      }
    });
  };

}

export function closeThankYouModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_THANK_YOU_MODAL,
      payload: {
        isThankYouModalOpen: false,
      }
    });
  };

}

export function openSocialShareModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SOCIAL_SHARE_MODAL,
      payload: {
        isSocialShareModal: true,
      }
    });
  };

}

export function closeSocialShareModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SOCIAL_SHARE_MODAL,
      payload: {
        isSocialShareModal: false,
      }
    });
  };
}

export function openHeaderModal(modalType) {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_HEADER_MODAL,
      payload: {
        modalType,
        actionValue: true
      }
    });
  }; 
}

export function closeHeaderModal(modalType) {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_HEADER_MODAL,
      payload: {
        modalType,
        actionValue: false
      }
    });
  }; 
}
