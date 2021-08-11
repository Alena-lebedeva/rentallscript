const validate = values => {

  const errors = {}

  if (!values.message) {
    errors.message = '*Required';
  }

  if (!values.paymentCurrency) {
    errors.paymentCurrency = '*Required';
  }

  return errors;
}

export default validate;