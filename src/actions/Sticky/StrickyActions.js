import {
  SET_STICKY_TOP,
  SET_STICKY_BOTTOM
} from '../../constants';

export function setStickyTop(value) {

  return (dispatch, getState) => {

    dispatch({
      type: SET_STICKY_TOP,
      payload: {
        stickyTop: value,
      }
    });
  };
}

export function setStickyBottom(value) {

  return (dispatch, getState) => {

    dispatch({
      type: SET_STICKY_BOTTOM,
      payload: {
        stickyBottom: value,
      }
    });
  };

}
