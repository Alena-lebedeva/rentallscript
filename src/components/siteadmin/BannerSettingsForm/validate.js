const validate = values => {

  const errors = {}

  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.content) {
    errors.content = 'Content is required';
  }

  return errors
}

export default validate;
