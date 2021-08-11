// Fetch request
import fetch from '../core/fetch';

export async function getWishListStatus(listId) {
    let query = `query getListingData($listId: String!, $preview: Boolean) {
                    UserListing (listId: $listId, preview: $preview) {
                    wishListStatus
                    }
                }`;

    const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: {
                listId
            }
        }),
        credentials: 'include'
    });

    const { data } = await resp.json();
    if (data.UserListing && data.UserListing.wishListStatus === true) {
        return true;
    } else {
        return false;
    }

}