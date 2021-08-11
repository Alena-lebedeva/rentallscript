import { gql } from 'react-apollo';

import {
    GET_BLOCKED_START,
    GET_BLOCKED_SUCCESS,
    GET_BLOCKED_ERROR
} from '../../constants';


const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      bookingType
      isPublished
      houseRules {
        houseRulesId
      }
      listingData {
        bookingNoticeTime,
        checkInStart,
        checkInEnd,
        maxDaysNotice,
        minNight,
        maxNight,
        basePrice,
        cleaningPrice,
        currency,
        weeklyDiscount,
        monthlyDiscount,
        cancellationPolicy
      }
      blockedDates {
        blockedDates
        reservationId
        calendarStatus
        isSpecialPrice
      }
      calendars {
        id
        name
        url
        listId
        status
      }
      listBlockedPrice {
        listId
        calendarStatus
        isSpecialPrice
        blockedDates
        calendarId
        reservationId
      }
    }
  }
`;


export function getListBlockedDates(
    listId,
    minNightValues,
    maxNightValues,
    checkInEndValue,
    checkInStartValue,
    houseRules,
    isCancel,
    isMaxDays,
    isBooking,
    basePrice,
    cleaningPrice,
    currency
) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_BLOCKED_START,
        });

        try {

            let mutation = gql`
            mutation ListingDataUpdate(
                $id: Int,
                $houseRules: [Int],
                $checkInStart:String,
                $checkInEnd:String,
                $minNight:Int,
                $maxNight:Int,
                $cancellationPolicy: Int,
                $maxDaysNotice: String,
                $bookingNoticeTime: String,
                $basePrice: Float,
                $cleaningPrice: Float,
                $currency: String
            ){
                ListingDataUpdate(
                    id: $id,
                    houseRules: $houseRules,
                    checkInStart:$checkInStart,
                    checkInEnd:$checkInEnd,
                    minNight:$minNight,
                    maxNight:$maxNight,
                    cancellationPolicy: $cancellationPolicy,
                    maxDaysNotice: $maxDaysNotice,
                    bookingNoticeTime: $bookingNoticeTime,
                    basePrice: $basePrice,
                    cleaningPrice: $cleaningPrice,
                    currency: $currency
                ) {
                 status
              }
            }
           `;


            const { data } = await client.mutate({
                mutation,
                variables: {
                    id: listId,
                    minNight: minNightValues,
                    maxNight: maxNightValues,
                    checkInStart: checkInStartValue,
                    checkInEnd: checkInEndValue,
                    houseRules: houseRules,
                    cancellationPolicy: isCancel,
                    maxDaysNotice: isMaxDays,
                    bookingNoticeTime: isBooking,
                    basePrice: basePrice,
                    cleaningPrice: cleaningPrice,
                    currency: currency

                },
                refetchQueries: [{ query, variables: { listId: listId, preview: true } }]
            });

            if (data && data.ListingDataUpdate) {
                if (data.ListingDataUpdate.status === 'success') {
                    dispatch({
                        type: GET_BLOCKED_SUCCESS,
                    });
                    return true;
                } else {
                    return false;
                }
            }

        } catch (error) {
            dispatch({
                type: GET_BLOCKED_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}