import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {

 

  const query = `
  mutation (
    $faqTitle1: String,
    $faqTitle2: String,
    $faqTitle3: String,
    $faqTitle4: String,
    $faqTitle5: String,
    $faqTitle6: String,
    $faqTitle7: String,
    $faqTitle8: String,
    $faqContent1: String,
    $faqContent2: String,
    $faqContent3: String,
    $faqContent4: String,
    $faqContent5: String,
    $faqContent6: String,
    $faqContent7: String,
    $faqContent8: String
) {
  updateWhyHostPage (
    faqTitle1: $faqTitle1,
    faqTitle2: $faqTitle2,
    faqTitle3: $faqTitle3,
    faqTitle4: $faqTitle4,
    faqTitle5: $faqTitle5,
    faqTitle6: $faqTitle6,
    faqTitle7: $faqTitle7,
    faqTitle8: $faqTitle8,
    faqContent1: $faqContent1,
    faqContent2: $faqContent2,
    faqContent3: $faqContent3,
    faqContent4: $faqContent4,
    faqContent5: $faqContent5,
    faqContent6: $faqContent6,
    faqContent7: $faqContent7,
    faqContent8: $faqContent8
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
