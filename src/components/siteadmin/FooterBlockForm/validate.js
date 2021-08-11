const validate = values => {

  const errors = {}

  if (!values.title1) {
    errors.title1 = 'Title is required';
  } else if (values.title1.trim() == "") {
    errors.title1 = 'Input is Blank';
  }

  if (!values.content1) {
    errors.content1 = 'Content is required';
  } else if (values.content1.trim() == "") {
    errors.content1 = 'Input is Blank';
  }

  if (!values.title2) {
    errors.title2 = 'Title is required';
  } else if (values.title2.trim() == "") {
    errors.title2 = 'Input is Blank';
  }

  if (!values.content2) {
    errors.content2 = 'Content is required';
  } else if (values.content2.trim() == "") {
    errors.content2 = 'Input is Blank';
  }

  if (!values.title3) {
    errors.title3 = 'Title is required';
  } else if (values.title3.trim() == "") {
    errors.title3 = 'Input is Blank';
  }

  if (!values.content3) {
    errors.content3 = 'Content is required';
  } else if (values.content3.trim() == "") {
    errors.content3 = 'Input is Blank';
  }

  return errors
}

export default validate;
