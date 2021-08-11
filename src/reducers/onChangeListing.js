import {
    ON_CHANGE_LISTING_START
} from '../constants';
export default function onChangeListing(state = {}, action) {
    switch (action.type) {
        case ON_CHANGE_LISTING_START:
            return {
                ...state,
                onChangeListingId: action.onChangeListingId
            };

        default:
            return {
                ...state,
            };
    }
}
