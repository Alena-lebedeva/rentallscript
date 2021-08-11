import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $hostingBlockTitleHeading: String,
    $hostingBlockTitle1: String,
    $hostingBlockTitle2: String,
    $hostingBlockTitle3: String,
    $hostingBlockContent1: String,
    $hostingBlockContent2: String,
    $hostingBlockContent3: String,
) {
  updateWhyHostPage (
    hostingBlockTitleHeading: $hostingBlockTitleHeading,
    hostingBlockTitle1: $hostingBlockTitle1,
    hostingBlockTitle2: $hostingBlockTitle2,
    hostingBlockTitle3: $hostingBlockTitle3,
    hostingBlockContent1: $hostingBlockContent1,
    hostingBlockContent2: $hostingBlockContent2,
    hostingBlockContent3: $hostingBlockContent3,
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
