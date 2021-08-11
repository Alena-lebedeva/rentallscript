const validate = values => {

  const errors = {}

  if (!values.location) {
    errors.location = 'Location is Required';
  }
  if (!values.locationAddress) {
    errors.locationAddress = 'Location Address is Required';
  }
  if (!values.isEnable) {
    errors.isEnable = 'Enabling Required';
  }

  return errors
}

export default validate
