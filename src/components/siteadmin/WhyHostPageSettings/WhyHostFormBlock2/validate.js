const validate = values => {

  const errors = {}

  if (!values.whyBlockTitle1) {
    errors.whyBlockTitle1 = '*Required';
  } else if (values.whyBlockTitle1.trim() == "") {
    errors.whyBlockTitle1 = '*Required';
  } else if (values.whyBlockTitle1 && values.whyBlockTitle1.length > 200) {
    errors.whyBlockTitle1 = '*Exceeding limit';
  }

  if (!values.whyBlockTitle2) {
    errors.whyBlockTitle2 = '*Required';
  } else if (values.whyBlockTitle2.trim() == "") {
    errors.whyBlockTitle2 = '*Required';
  } else if (values.whyBlockTitle2 && values.whyBlockTitle2.length > 200) {
    errors.whyBlockTitle2 = '*Exceeding limit';
  }

  if (!values.whyBlockContent1) {
    errors.whyBlockContent1 = '*Required';
  } else if (values.whyBlockContent1.trim() == "") {
    errors.whyBlockContent1 = '*Required';
  } else if (values.whyBlockContent1 && values.whyBlockContent1.length > 400) {
    errors.whyBlockContent1 = '*Exceeding limit';
  }

  if (!values.whyBlockContent2) {
    errors.whyBlockContent2 = '*Required';
  } else if (values.whyBlockContent2.trim() == "") {
    errors.whyBlockContent2 = '*Required';
  } else if (values.whyBlockContent2 && values.whyBlockContent2.length > 400) {
    errors.whyBlockContent2 = '*Exceeding limit';
  }
  
  return errors
}

export default validate;
