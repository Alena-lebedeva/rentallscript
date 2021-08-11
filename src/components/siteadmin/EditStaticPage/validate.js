import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.content) {
    errors.content = messages.required.defaultMessage;
  } else if (values.content && values.content.trim() == '' ) {
    errors.content = messages.required.defaultMessage;
  }

  if (!values.metaTitle) {
    errors.metaTitle = messages.required.defaultMessage;
  } else if (values.metaTitle && values.metaTitle.trim() == '' ) {
    errors.metaTitle = messages.required.defaultMessage;
  } else if (values.metaTitle && values.metaTitle.length > 255) {
    errors.metaTitle = messages.metaTitle.defaultMessage;
  }

  if (!values.metaDescription) {
    errors.metaDescription = messages.required.defaultMessage;
  } else if (values.metaDescription && values.metaDescription.trim() == '' ) {
    errors.metaDescription = messages.required.defaultMessage;
  }else if (values.metaDescription && values.metaDescription.length > 255) {
    errors.metaDescription = messages.metaDescription.defaultMessage;
  }

  return errors
}

export default validate
