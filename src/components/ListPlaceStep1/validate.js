import messages from '../../locale/messages';


const validate = values => {

  const errors = {}

  if (!values.houseType) {
    errors.houseType = messages.required;
  }

  if (!values.country) {
    errors.country = messages.required;
  }

  if (!values.state) {
    errors.state = messages.required;
  }

  if (!values.city) {
    errors.city = messages.required;
  }

  if (!values.street) {
    errors.street = messages.required;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  }

  return errors
}

export default validate
