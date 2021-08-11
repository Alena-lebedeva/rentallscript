import { gql } from 'react-apollo';
import { reset, change } from 'redux-form';
import { hideLoading } from 'react-redux-loading-bar';

import {
  SEARCH_LISTING_START,
  SEARCH_LISTING_SUCCESS,
  SEARCH_LISTING_ERROR
} from '../constants';

import { getSearchResults } from './getSearchResults';


const query = gql`
  query(
      $personCapacity: Int,
      $dates: String,
      $currentPage: Int,
      $geography: String,
      $geoType: String,
      $lat: Float,
      $lng: Float,
      $sw_lat: Float, 
      $sw_lng: Float, 
      $ne_lat: Float, 
      $ne_lng: Float,
    ){
      SearchListing(
        personCapacity: $personCapacity,
        dates: $dates,
        currentPage: $currentPage,
        geography: $geography,
        geoType: $geoType,
        lat: $lat,
        lng: $lng,
        sw_lat: $sw_lat, 
        sw_lng: $sw_lng, 
        ne_lat: $ne_lat, 
        ne_lng: $ne_lng,
      ) {
        count
        results {
          id
          title
          personCapacity
          lat
          lng
          beds
          bookingType
          coverPhoto
          reviewsCount,
          reviewsStarRating,
          listPhotos {
            id
            name
            type
            status
          }
          listingData {
            basePrice
            currency
          }
          settingsData {
            listsettings {
              id
              itemName
              itemDescription
            }
          }
          wishListStatus
          isListOwner
        }
      }
    }
`;

export function searchListing({ personCapacity, dates, geography, currentPage, geoType, lat, lng, sw_lat, sw_lng, ne_lat, ne_lng }) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: SEARCH_LISTING_START });
    dispatch(reset('SearchForm'));

    try {
      const { data } = await client.query({
        query,
        variables: {
          personCapacity,
          dates,
          currentPage,
          geography,
          geoType,
          lat,
          lng,
          sw_lat,
          sw_lng,
          ne_lat,
          ne_lng
        },
        fetchPolicy: 'network-only'
      });
      if (data.SearchListing) {
        dispatch({ type: SEARCH_LISTING_SUCCESS });
        await dispatch(change('SearchForm', 'personCapacity', personCapacity));
        await dispatch(change('SearchForm', 'dates', dates));
        await dispatch(change('SearchForm', 'geography', geography));
        await dispatch(change('SearchForm', 'currentPage', currentPage));
        await dispatch(change('SearchForm', 'geoType', geoType));
        await dispatch(change('SearchForm', 'lat', lat));
        await dispatch(change('SearchForm', 'lng', lng));
        await dispatch(change('SearchForm', 'searchByMap', false));
        await dispatch(change('SearchForm', 'sw_lat', sw_lat));
        await dispatch(change('SearchForm', 'sw_lng', sw_lng));
        await dispatch(change('SearchForm', 'ne_lat', ne_lat));
        await dispatch(change('SearchForm', 'ne_lng', ne_lng));
        await dispatch(change('SearchForm', 'initialLoad', true));
        await dispatch(change('SearchForm', 'markerHighlight', {}));
        // Default Map Show
        await dispatch(change('SearchForm', 'showMap', true));
        dispatch(getSearchResults(data.SearchListing));
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch({
        type: SEARCH_LISTING_ERROR,
        payload: {
          error
        }
      });
      dispatch(hideLoading());
      return false;
    }

    return true;
  };
}
