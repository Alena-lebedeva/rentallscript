import { gql } from 'react-apollo';

import history from '../../core/history';
import {
  ADMIN_VIEW_RECEIPT_START,
  ADMIN_VIEW_RECEIPT_SUCCESS,
  ADMIN_VIEW_RECEIPT_ERROR,
} from '../../constants';

export function viewReceiptAdmin(reservationId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_VIEW_RECEIPT_START,
    });

    try {

      let query = gql`
        query getItinerary ($reservationId: Int!){
          getItinerary(reservationId: $reservationId){
            id
            listId
            hostId
            guestId
            checkIn
            checkOut
            basePrice
            cleaningPrice
            total
            currency
            confirmationCode
            guestServiceFee
            discount
            discountType
            createdAt
            updatedAt
            listData {
              id
              title
              street
              city
              state
              country
              zipcode
              listingData {
                checkInStart
                checkInEnd
              }
              settingsData {
                id
                listsettings {
                  id
                  itemName
                }
              }
            }
            hostData {
              displayName
            }
            guestData {
              displayName
            }
          }
        }
      `;

      const { data } = await client.query({
        query,
        variables: {
          reservationId
        },
      });

      if (data && data.getItinerary) {
        dispatch({
          type: ADMIN_VIEW_RECEIPT_SUCCESS,
          payload: {
            data: data.getItinerary,
          }
        });
        history.push('/siteadmin/receipt/' + reservationId);
      }

    } catch (error) {
      dispatch({
        type: ADMIN_VIEW_RECEIPT_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}