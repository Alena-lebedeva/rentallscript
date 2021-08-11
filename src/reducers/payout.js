import {
  GET_PAYOUT_START,
  GET_PAYOUT_SUCCESS,
  GET_PAYOUT_ERROR
} from '../constants';

export default function payout(state = {}, action) {
  switch (action.type) {

    case GET_PAYOUT_START:
      return {
        ...state,
        getPayoutLoading: action.payload.getPayoutLoading
      };
      
    case GET_PAYOUT_SUCCESS:
      return {
        ...state,
        data: action.payload.payoutData,
        getPayoutLoading: action.payload.getPayoutLoading
      };

    case GET_PAYOUT_ERROR:
      return {
        ...state,
        getPayoutLoading: action.payload.getPayoutLoading
      };

    default:
      return state;
  }
}