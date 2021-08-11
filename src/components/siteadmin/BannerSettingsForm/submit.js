// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {

  const query = `
    query (
      $id: Int,
      $title: String,
      $content: String,
    ) {
      updateBannerSettings (
        id: $id,
        title: $title,
        content: $content,
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
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.updateBannerSettings.status === "success") {
    toastr.success("Update Banner Settings", "Changes are updated!");
  } else {
    toastr.error("Update Banner Settings", "Updating Banner Settings failed");
  }

}

export default submit;
