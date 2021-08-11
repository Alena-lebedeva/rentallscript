import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.newPassword) {
    errors.newPassword = messages.required;
  } else if (values.newPassword.length < 8) {
    errors.newPassword = messages.passwordError3;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.required;
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = messages.passwordError5;
  }

  return errors
}

export default validate