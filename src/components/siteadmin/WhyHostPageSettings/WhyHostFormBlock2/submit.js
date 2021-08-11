import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $whyBlockTitle1: String,
    $whyBlockContent1: String,
    $whyBlockTitle2: String,
    $whyBlockContent2: String,
) {
  updateWhyHostPage (
    whyBlockTitle1: $whyBlockTitle1,
    whyBlockContent1: $whyBlockContent1,
    whyBlockTitle2: $whyBlockTitle2,
    whyBlockContent2: $whyBlockContent2,
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

  if (data.updateWhyHostPage.status === "success") {
    toastr.success("Success", "Updated why become host settings");
  } else {
    toastr.error("Oops!", "Updating Why Become Host Settings failed");
  }

}

export default submit;
