import {
    ON_CHANGE_PAYOUT_START
} from '../constants';
export default function payoutChangeListing(state = {}, action) {
    switch (action.type) {
        case ON_CHANGE_PAYOUT_START:
            return {
                ...state,
                onChangePayoutId: action.onChangePayoutId
            };

        default:
            return {
                ...state,
            };
    }
}
