const validate = values => {

  const errors = {}

  if (!values.location) {
    errors.location = 'Location is Required';
  } else if (values.location.trim() == "") {
    errors.location = 'Input is Blank';
  }

  if (!values.locationAddress) {
    errors.locationAddress = 'Location Address is Required';
  } else if (values.locationAddress.trim() == "") {
    errors.locationAddress = 'Input is Blank';
  }

  return errors
}

export default validate
