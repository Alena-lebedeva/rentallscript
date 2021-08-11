// Fetch request
import fetch from '../../../core/fetch';

// Redux
import { getSearchResults, loadingSearchResults } from '../../../actions/getSearchResults';

async function submit(values, dispatch) {

  dispatch(loadingSearchResults());
  const query =
    `query(
      $personCapacity: Int,
      $dates: String,
      $currentPage: Int,
      $lat: Float,
      $lng: Float,
      $roomType: [Int],
      $bedrooms: Int,
      $bathrooms: Int,
      $beds: Int,
      $amenities: [Int],
      $spaces: [Int],
      $houseRules: [Int],
      $priceRange: [Int],
      $geography: String,
      $bookingType: String,
      $geoType: String,
      $searchByMap: Boolean,
      $sw_lat: Float,
      $sw_lng: Float,
      $ne_lat: Float,
      $ne_lng: Float
    ){
      SearchListing(
        personCapacity: $personCapacity,
        dates: $dates,
        currentPage: $currentPage
        lat: $lat,
        lng: $lng,
        roomType: $roomType,
        bedrooms: $bedrooms,
        bathrooms: $bathrooms,
        beds: $beds,
        amenities: $amenities,
        spaces: $spaces,
        houseRules: $houseRules,
        priceRange: $priceRange,
        geography: $geography,
        bookingType: $bookingType,
        geoType: $geoType,
        searchByMap: $searchByMap,
        sw_lat: $sw_lat,
        sw_lng: $sw_lng,
        ne_lat: $ne_lat,
        ne_lng: $ne_lng
      ) {
        count
        results {
          id
          title
          personCapacity
          lat
          lng
          beds
          coverPhoto
          bookingType
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



  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data && data.SearchListing) {
    dispatch(getSearchResults(data.SearchListing));
  }

}

export default submit;
