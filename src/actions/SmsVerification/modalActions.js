import {
  OPEN_SMS_VERIFICATION_MODAL,
  CLOSE_SMS_VERIFICATION_MODAL
} from '../../constants';

export function openSmsVerificationModal(formType) {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SMS_VERIFICATION_MODAL,
      payload: {
        smsVerificationModalOpen: true,
        formType
      }
    });
  };

}

export function closeSmsVerificationModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SMS_VERIFICATION_MODAL
    });
  };

}
