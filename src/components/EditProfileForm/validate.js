import messages from '../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.required;
  } else if (values.firstName && values.firstName.trim() == "") {
    errors.firstName = messages.required;
  }

  if (!values.lastName) {
    errors.lastName = messages.required;
  } else if (values.lastName && values.lastName.trim() == "") {
    errors.lastName = messages.required;
  }

  if (!values.email) {
    errors.email = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.gender) {
    errors.gender = messages.required;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.required;
  } else if (values.phoneNumber && values.phoneNumber.trim() == "") {
    errors.phoneNumber = messages.required;
  } else if (isNaN(values.phoneNumber)) {
    errors.phoneNumber = messages.phoneNumberInvalid;
  }


  if (!values.preferredLanguage) {
    errors.preferredLanguage = messages.required;
  }

  if (!values.preferredCurrency) {
    errors.preferredCurrency = messages.required;
  }

  if (!values.location) {
    errors.location = messages.required;
  } else if (values.location && values.location.trim() == "") {
    errors.location = messages.required;
  }

  if (!values.info) {
    errors.info = messages.required;
  } else if (values.info && values.info.trim() == "") {
    errors.info = messages.required;
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = messages.required;
  }

  return errors
}

export default validate
