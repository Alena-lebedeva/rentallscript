import {
    ON_CHANGE_LISTING_START
} from '../../constants';
export function onChangeListing(listValue) {
    return (dispatch, getState) => {
        dispatch({
            type: ON_CHANGE_LISTING_START,
            onChangeListingId: listValue
        });
    };
}