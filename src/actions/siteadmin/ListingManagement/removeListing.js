import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';
import {
  SITE_ADMIN_REMOVE_LISTING_START,
  SITE_ADMIN_REMOVE_LISTING_SUCCESS,
  SITE_ADMIN_REMOVE_LISTING_ERROR
} from '../../../constants';

const getUpcomingBookingQuery = gql`
query getUpcomingBookings ($listId: Int!){
    getUpcomingBookings(listId: $listId){
      count
    }
  }`;

export function removeListing(listId, userRole) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SITE_ADMIN_REMOVE_LISTING_START,
    });

    try {

      let upcomingBookingCount;
      const bookedData = await client.query({
        query: getUpcomingBookingQuery,
        variables: {
          listId
        },
        fetchPolicy: 'network-only'
      });

      if (bookedData && bookedData.data && bookedData.data.getUpcomingBookings) {
        upcomingBookingCount = bookedData.data.getUpcomingBookings.count;
      }

      if (upcomingBookingCount > 0) {
        toastr.error("Error Occured", 'You cannot delete this list as it has upcoming bookings or enquiries.');
      }
      else {
        const mutation = gql`
            mutation adminRemoveListing($listId:Int!) {
              adminRemoveListing (listId:$listId) {
                status
                id
                name
              }
            }
          `;
        // Send Request to get listing data
        const { data } = await client.mutate({
          mutation,
          variables: { listId },
        });

        if (data && data.adminRemoveListing) {
          dispatch({
            type: SITE_ADMIN_REMOVE_LISTING_SUCCESS,
          });
          toastr.success("Success!", "Listing removed successfully");

          if (data.adminRemoveListing.length > 0) {
            const removeFiles = await fetch('/removeMultiFiles', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                files: data.adminRemoveListing,
              }),
              credentials: 'include',
            });
          }
        } else {
          dispatch({
            type: SITE_ADMIN_REMOVE_LISTING_ERROR,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: SITE_ADMIN_REMOVE_LISTING_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
