// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';
import history from '../../../core/history';
async function submit(values, dispatch) {

  const mutation = `
  mutation updatePopularLocation(
    $id: Int,
    $location: String,
    $locationAddress: String,
    $image: String,
  ) {
    updatePopularLocation(
      id: $id,
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

  if (data.updatePopularLocation.status === "success") {
    toastr.success("Update Location", "Changes are updated!");
    history.push('/siteadmin/popularlocation');
  } else {
    toastr.error("Update Location", "Updating location failed");
  }

}

export default submit;
