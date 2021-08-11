import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.address1 || (values.address1 && values.address1.toString().trim() == '')) {
    errors.address1 = messages.required;
  }

  if (!values.country) {
    errors.country = messages.required;
  }

  if (!values.city || (values.city && values.city.toString().trim() == '')) {
    errors.city = messages.required;
  }

  if (!values.state || (values.state && values.state.toString().trim() == '')) {
    errors.state = messages.required;
  }

  // if (!values.zipcode) { // Optional
  //   errors.zipcode = messages.required;
  // }

  if (!values.payEmail) {
    errors.payEmail = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.payEmail)) {
    errors.payEmail = messages.payoutError5;
  }

  if (!values.currency) {
    errors.currency = messages.required;
  }

  return errors
}

export default validate;