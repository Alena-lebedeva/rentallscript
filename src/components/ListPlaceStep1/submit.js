// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';
import { toastr } from 'react-redux-toastr';

// For Redirect
import history from '../../core/history';

// Redux Action
import { getListingData } from '../../actions/getListing';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

async function submit(values, dispatch) {

  let bedTypes = JSON.stringify(values.bedTypes);

  let variables = Object.assign({}, values, { bedTypes });
  const checkMapQuery = `
  query ($address: String) {
    locationItem(address: $address) {
      lat
      lng
      status
    }
  }
`;
  let address = `${values.street},${values.city},${values.state},${values.zipcode},${values.country},`;

  const mapResp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: checkMapQuery,
      variables: { address }
    }),
    credentials: 'include'
  });

  const checkMapResponse = await mapResp.json();
  if (checkMapResponse && checkMapResponse.data && checkMapResponse.data.locationItem && checkMapResponse.data.locationItem.status !== 200) {
    toastr.error("Invalid Address!", "Your address seems to be invalid, please go back to edit your address!");
    return;
  } else {
    dispatch(setLoaderStart('location'));

    const query = `query (
    $roomType:String,
    $houseType:String,
    $residenceType:String,
    $bedrooms:String,
    $buildingSize:String,
    $bedType:String,
    $beds:Int,
    $personCapacity:Int,
    $bathrooms:Float,
    $bathroomType:String,
    $country:String,
    $street:String,
    $buildingName:String,
    $city:String,
    $state:String,
    $zipcode:String,
    $lat:Float,
    $lng:Float,
    $bedTypes: String,
  ) {
      createListing (
        roomType:$roomType,
        houseType:$houseType,
        residenceType: $residenceType,
        bedrooms: $bedrooms,
        buildingSize: $buildingSize
        bedType: $bedType
        beds: $beds
        personCapacity: $personCapacity
        bathrooms: $bathrooms
        bathroomType: $bathroomType
        country: $country
        street: $street
        buildingName: $buildingName
        city: $city
        state: $state
        zipcode: $zipcode,
        lat: $lat,
        lng: $lng,
        bedTypes: $bedTypes,
      ) {
        status
        id
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
        variables: variables
      }),
      credentials: 'include'
    });

    const { data } = await resp.json();

    if (data.createListing.status == "success") {
      await dispatch(getListingData(data.createListing.id));
      await dispatch(manageListingSteps(data.createListing.id, 1));
      history.push(data.createListing.id + '/map');
      dispatch(setLoaderComplete('location'));
      await dispatch(setLoaderComplete('location'));
    } else if (data.createListing.status == "notLoggedIn") {
      throw new SubmissionError({ _error: messages.notLoggedIn });
    } else if (data.createListing.status == "adminLoggedIn") {
      throw new SubmissionError({ _error: messages.adminLoggedIn });
    } else {
      throw new SubmissionError({ _error: messages.somethingWentWrong });
    }
  }

}

export default submit;
