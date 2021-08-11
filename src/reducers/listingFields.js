import { GET_LISTING_FIELDS_DATA_SUCCESS } from '../constants';

export default function getListingFeilds(state = {}, action) {
  switch (action.type) {
    case GET_LISTING_FIELDS_DATA_SUCCESS:
      return {
        ...state,
        data: action.listingFields,
      };
    default:
      return state;
  }
}
