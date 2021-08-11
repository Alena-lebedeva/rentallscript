export function getImageLoader(actionType, data) {

  return async (dispatch, getState, { client }) => {

    dispatch({
        type: actionType,
        payload: {
            loader: data
        }
      });

  };

}

export function getImageLoader2(actionType, data) {

  return async (dispatch, getState, { client }) => {

    dispatch({
        type: actionType,
        payload: {
            loader2: data
        }
      });

  };

}
