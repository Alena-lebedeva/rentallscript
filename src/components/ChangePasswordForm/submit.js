// Redux Form
import { reset } from 'redux-form';

// Fetch Request
import fetch from '../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {

  if (values.newPassword != values.confirmPassword) {
    toastr.error("Password change failed", "Password mismatch.Please try again.");
    return;
  }

  const query = `
    mutation (
        $oldPassword: String,
        $newPassword: String,
        $confirmPassword: String,
        $registeredType: String,
    ) {
        ChangePassword (
            oldPassword: $oldPassword,
            newPassword: $newPassword,
            confirmPassword: $confirmPassword,
            registeredType: $registeredType
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

  if (data.ChangePassword.status === 'success') {
    toastr.success("Change Password", "Password is updated successfully!");
    // Clear form data
    dispatch(reset('ChangePasswordForm'));
  } else if (data.ChangePassword.status === 'WrongPassword') {
    toastr.error("Change Password", "Current password is wrong, try again!");
  } else if (data.ChangePassword.status === 'notLoggedIn') {
    toastr.error("Change Password", "You are not logged in");
  } else if (data.ChangePassword.status === 'WrongConfirmPassword') {
    toastr.error("Change Password", "Confirm password is mismatch with new password!");
  } else {
    toastr.error("Change Password", "Sorry, something went wrong! Please reload this page!");
  }

}

export default submit;
