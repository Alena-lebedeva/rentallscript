// Redux Form
import { reset } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

import { toastr } from 'react-redux-toastr';

import { closeReportUserModal, openThankYouModal } from '../../actions/modalActions';

async function submit(values, dispatch) {

    const query = `mutation (
    $reporterId:String,
    $userId:String,
    $reportType: String,
    $profileId: Int,
    $reporterName: String,
  ) {
      CreateReportUser (
        reporterId:$reporterId,
        userId:$userId,
        reportType: $reportType,
        profileId: $profileId,
        reporterName: $reporterName,
      ) {
        status
        firstName
      }
    }`;


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
        credentials: 'include'
    });

    const { data } = await resp.json();

    if (data.CreateReportUser.status == "success") {
        dispatch(closeReportUserModal());
        dispatch(reset('ReportUserForm'));
        dispatch(openThankYouModal());
    } else {
        toastr.error("Error!", "Sorry, something went wrong. Please try again!");
    }

}

export default submit;
