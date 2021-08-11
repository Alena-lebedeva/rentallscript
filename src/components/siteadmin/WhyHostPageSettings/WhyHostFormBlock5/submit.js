import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $paymentTitleHeading: String,
    $paymentTitle1: String,
    $paymentTitle2: String,
    $paymentTitle3: String,
    $paymentContent1: String,
    $paymentContent2: String,
    $paymentContent3: String,
) {
  updateWhyHostPage (
    paymentTitleHeading: $paymentTitleHeading,
    paymentTitle1: $paymentTitle1,
    paymentTitle2: $paymentTitle2,
    paymentTitle3: $paymentTitle3,
    paymentContent1: $paymentContent1,
    paymentContent2: $paymentContent2,
    paymentContent3: $paymentContent3,
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
