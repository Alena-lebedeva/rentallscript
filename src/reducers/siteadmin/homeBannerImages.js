import {
  GET_HOME_BANNER_START,
  GET_HOME_BANNER_SUCCESS,
  GET_HOME_BANNER_ERROR,
  STATIC_BLOCK_IMAGE_UPLOAD_START,
  STATIC_BLOCK_IMAGE_SUCCESS,
  STATIC_BLOCK_IMAGE_ERROR,
  REMOVE_STATIC_INFO_IMAGE_SUCCESS,
  REMOVE_STATIC_INFO_IMAGE_ERROR,
  STATIC_INFO_BLOCK_UPLOAD_LOADER_START,
  UPLOAD_STATIC_INFO_BLOCK_IMAGE_SUCCESS,
  UPLOAD_STATIC_INFO_BLOCK_IMAGE_ERROR,
  DELETE_STATIC_INFO_IMAGE_SUCCESS,
  DELETE_STATIC_INFO_IMAGE_ERROR,
  STATIC_BLOCK_INFO_SUCCESS
} from '../../constants';

export default function homeBannerImages(state = {}, action) {
  switch (action.type) {

    case GET_HOME_BANNER_START:
      return {
        ...state,
      };

    case GET_HOME_BANNER_SUCCESS:
      return {
        ...state,
        data: action.data.getHomeBanner,
      };

    case GET_HOME_BANNER_ERROR:
      return {
        ...state,
      };

    case STATIC_BLOCK_IMAGE_UPLOAD_START:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case STATIC_BLOCK_IMAGE_SUCCESS:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case STATIC_BLOCK_IMAGE_ERROR:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case REMOVE_STATIC_INFO_IMAGE_SUCCESS:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading
      };

    case REMOVE_STATIC_INFO_IMAGE_ERROR:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case STATIC_INFO_BLOCK_UPLOAD_LOADER_START:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading,
      };

    case UPLOAD_STATIC_INFO_BLOCK_IMAGE_SUCCESS:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading,
      };

    case UPLOAD_STATIC_INFO_BLOCK_IMAGE_ERROR:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading,
      };

    case DELETE_STATIC_INFO_IMAGE_SUCCESS:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading
      };

    case DELETE_STATIC_INFO_IMAGE_ERROR:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading,
      };

    case STATIC_BLOCK_INFO_SUCCESS:
      return {
        ...state,
        blockData: action.payload.data,
      };

    default:
      return state;
  }
}
