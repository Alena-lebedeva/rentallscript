// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch Request
import fetch from '../../../core/fetch';

// Language
import messages from './messages';

// Toaster
import { toastr } from 'react-redux-toastr';

// Redirection
import history from '../../../core/history';

async function submit(values, dispatch) {

  const query = `
  query (
    $profileId:Int!,
    $firstName:String,
    $lastName:String,
    $dateOfBirth:String,
    $gender:String,
    $phoneNumber: String,
    $preferredLanguage: String,
    $preferredCurrency: String,
    $location: String,
    $info: String,
  ) {
    updateUser (
      profileId:$profileId,
      firstName: $firstName,
      lastName: $lastName,
      dateOfBirth: $dateOfBirth,
      gender: $gender,
      phoneNumber: $phoneNumber,
      preferredLanguage: $preferredLanguage,
      preferredCurrency: $preferredCurrency,
      location: $location,
      info: $info,
    ) {
      status
    }
  }
  `;

  const params = {
    profileId: values.profileId,
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    dateOfBirth: values.dateOfBirth,
    phoneNumber: values.phoneNumber,
    preferredLanguage: values.preferredLanguage,
    preferredCurrency: values.preferredCurrency,
    location: values.location,
    info: values.info,
  };

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: params
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.updateUser.status === "success") {
    toastr.success("Update Profile", "Changes are updated!");
    history.push('/siteadmin/users');
  } else {
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default submit;
