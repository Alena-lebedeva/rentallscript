import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $coverSectionTitle1: String,
    $coverSectionContent1: String,
    $coverSectionContent2: String,
    $coverSectionImage1: String,
    $coverSectionFeature1: String,
    $coverSectionFeature2: String,
    $coverSectionFeature3: String,
    $coverSectionFeature4: String,
    $coverSectionFeature5: String,
    $coverSectionFeature6: String,
) {
  updateWhyHostPage (
    coverSectionTitle1: $coverSectionTitle1,
    coverSectionContent1: $coverSectionContent1,
    coverSectionContent2: $coverSectionContent2,
    coverSectionImage1: $coverSectionImage1,
    coverSectionFeature1: $coverSectionFeature1,
    coverSectionFeature2: $coverSectionFeature2,
    coverSectionFeature3: $coverSectionFeature3,
    coverSectionFeature4: $coverSectionFeature4,
    coverSectionFeature5: $coverSectionFeature5,
    coverSectionFeature6: $coverSectionFeature6,
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
