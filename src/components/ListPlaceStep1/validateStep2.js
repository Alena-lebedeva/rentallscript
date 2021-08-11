import messages from '../../locale/messages';

const validateStep2 = values => {

  const errors = {}

  if (!values.title) {
    errors.title = messages.required;
  } else if (values.title && values.title.trim() == "") {
    errors.title = messages.required;
  } else if (values.title && values.title.length > 50) {
    errors.title = messages.emptySpace;
  }

  if (!values.description) {
    errors.description = messages.required;
  } else if (values.description && values.description.trim() == "") {
    errors.description = messages.required;
  }

  return errors
}

export default validateStep2
