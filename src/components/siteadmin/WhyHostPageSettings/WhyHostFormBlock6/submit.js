import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $quoteSectionTitle1: String,
    $quoteSectionContent1: String,
    $quoteSectionTitle2: String,
    $quoteSectionContent2: String,
    $quoteSectionImage1: String,
    $quoteSectionImage2: String,
    $quoteSectionButton1: String,
    $quoteSectionButton2: String
) {
  updateWhyHostPage (
    quoteSectionTitle1: $quoteSectionTitle1,
    quoteSectionContent1: $quoteSectionContent1,
    quoteSectionTitle2: $quoteSectionTitle2,
    quoteSectionContent2: $quoteSectionContent2,
    quoteSectionImage1: $quoteSectionImage1,
    quoteSectionImage2: $quoteSectionImage2,
    quoteSectionButton1: $quoteSectionButton1,
    quoteSectionButton2: $quoteSectionButton2
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
