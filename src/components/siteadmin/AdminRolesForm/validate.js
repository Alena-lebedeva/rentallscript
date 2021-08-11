import messages from './messages';

const validate = values => {

  const errors = {}

  if (!values.name) {
    errors.name = messages.required;
  } else if (values.name && values.name.toString().trim() == "") {
    errors.name = messages.required;
  } else if (values.name && values.name.length > 255) {
    errors.name = messages.exceedLimit;
  }

  if (values.description && values.description.toString().trim() == "") {
    errors.description = messages.required;
  }

  if (!values.privileges || (values.privileges && values.privileges.length <= 0)) {
    errors.privileges = messages.required;
  }

  return errors
}

export default validate
