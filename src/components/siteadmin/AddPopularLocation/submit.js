// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';
import history from '../../../core/history';
async function submit(values, dispatch) {


  if (values.image == null) {
    toastr.error("Error Occured", "Please Add Location Image");
  }
  else {
    const mutation = `
  mutation addPopularLocation(
    $location: String,
    $locationAddress: String,
    $image: String,
  ) {
    addPopularLocation(
      location: $location,
      locationAddress: $locationAddress,
      image: $image,
    ) {
        status
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
        query: mutation,
        variables: values
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();


    if (data.addPopularLocation.status === "success") {
      toastr.success("Added Location", "Successfully Added!");
      history.push('/siteadmin/popularlocation');
    } else {
      toastr.error("Added Location", "Failed to create");
    }
  }

}

export default submit;
