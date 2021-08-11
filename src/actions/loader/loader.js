import {
  SET_LOADER_START,
  SET_LOADER_COMPLETE
} from '../../constants';

export function setLoaderStart(name) {
  return {
    type: SET_LOADER_START,
    payload: {
      name,
      status: true
    }
  };
}

export function setLoaderComplete(name) {
  return {
    type: SET_LOADER_COMPLETE,
    payload: {
      name,
      status: false
    }
  };
}