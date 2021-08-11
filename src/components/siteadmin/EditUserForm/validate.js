import messages from './messages';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.required;
  }

  if (!values.lastName) {
    errors.lastName = messages.required;
  }

  if (!values.gender) {
    errors.gender = messages.required;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.required;
  }

  if (!values.preferredLanguage) {
    errors.preferredLanguage = messages.required;
  }

  if (!values.preferredCurrency) {
    errors.preferredCurrency = messages.required;
  }

  if (!values.location) {
    errors.location = messages.required;
  }

  if (!values.info) {
    errors.info = messages.required;
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = messages.required;
  }

  return errors
}

export default validate
