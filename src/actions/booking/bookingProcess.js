import { gql } from 'react-apollo';

import history from '../../core/history';
import {
  BOOKING_PROCESS_START,
  BOOKING_PROCESS_SUCCESS,
  BOOKING_PROCESS_ERROR,
} from '../../constants';

export function bookingProcess(listId, guests, startDate, endDate, preApprove) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: BOOKING_PROCESS_START,
      payload: {
        bookingLoading: true
      }
    });

    try {

      let query = gql`
          query UserListing($listId:String!) {
            UserListing (listId:$listId) {
              id
              userId
              title
              coverPhoto
              country
              city
              state
              personCapacity
              bookingType
              listPhotos{
                id
                name
              }
              user {
                id
                email
                profile{
                  profileId
                  displayName
                  firstName
                  picture
                }
              }
              settingsData {
                id
                settingsId
                listsettings {
                  id
                  itemName
                  settingsType {
                    typeName
                  }
                }
              }
              houseRules {
                houseRulesId
                listsettings{
                  itemName
                  isEnable
                  settingsType {
                    typeName
                  }
                }
              }
              listingData {
                checkInStart,
                checkInEnd,
                basePrice,
                cleaningPrice,
                currency,
                weeklyDiscount,
                monthlyDiscount,
                cancellation {
                  id
                  policyName
                }
              }
              listBlockedPrice {
                id
                listId
                isSpecialPrice
                blockedDates
              }
            }
        }
      `;

      const { data } = await client.query({
        query,
        variables: {
          listId
        },
      });

      if (data && data.UserListing) {
        dispatch({
          type: BOOKING_PROCESS_SUCCESS,
          payload: {
            data: data.UserListing,
            bookDetails: {
              guests,
              startDate,
              endDate,
              preApprove
            },
            bookingLoading: false
          }
        });
        history.push('/book/' + listId);
      }

    } catch (error) {
      dispatch({
        type: BOOKING_PROCESS_ERROR,
        payload: {
          error,
          bookingLoading: false
        }
      });
      return false;
    }

    return true;
  };
}

