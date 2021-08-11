
const validate = values => {

  const errors = {}

  if (values.paymentMethodId == 1 && !values.paymentCurrency) {
    errors.paymentCurrency = 'Please choose a currency';
  }

  return errors
}

export default validate;