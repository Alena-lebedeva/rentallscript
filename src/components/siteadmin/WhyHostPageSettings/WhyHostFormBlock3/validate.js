const validate = values => {

  const errors = {}

  if (!values.hostingBlockTitleHeading) {
    errors.hostingBlockTitleHeading = '*Required';
  } else if (values.hostingBlockTitleHeading.trim() == "") {
    errors.hostingBlockTitleHeading = '*Required';
  } else if (values.hostingBlockTitleHeading && values.hostingBlockTitleHeading.length > 200) {
    errors.hostingBlockTitleHeading = '*Exceeding limit';
  }

  if (!values.hostingBlockTitle1) {
    errors.hostingBlockTitle1 = '*Required';
  } else if (values.hostingBlockTitle1.trim() == "") {
    errors.hostingBlockTitle1 = '*Required';
  } else if (values.hostingBlockTitle1 && values.hostingBlockTitle1.length > 200) {
    errors.hostingBlockTitle1 = '*Exceeding limit';
  }

  if (!values.hostingBlockTitle2) {
    errors.hostingBlockTitle2 = '*Required';
  } else if (values.hostingBlockTitle2.trim() == "") {
    errors.hostingBlockTitle2 = '*Required';
  } else if (values.hostingBlockTitle2 && values.hostingBlockTitle2.length > 200) {
    errors.hostingBlockTitle2 = '*Exceeding limit';
  }

  if (!values.hostingBlockTitle3) {
    errors.hostingBlockTitle3 = '*Required';
  } else if (values.hostingBlockTitle3.trim() == "") {
    errors.hostingBlockTitle3 = '*Required';
  } else if (values.hostingBlockTitle3 && values.hostingBlockTitle3.length > 200) {
    errors.hostingBlockTitle3 = '*Exceeding limit';
  }

  if (!values.hostingBlockContent1) {
    errors.hostingBlockContent1 = '*Required';
  } else if (values.hostingBlockContent1.trim() == "") {
    errors.hostingBlockContent1 = '*Required';
  } else if (values.hostingBlockContent1 && values.hostingBlockContent1.length > 400) {
    errors.hostingBlockContent1 = '*Exceeding limit';
  }

  if (!values.hostingBlockContent2) {
    errors.hostingBlockContent2 = '*Required';
  } else if (values.hostingBlockContent2.trim() == "") {
    errors.hostingBlockContent2 = '*Required';
  } else if (values.hostingBlockContent2 && values.hostingBlockContent2.length > 400) {
    errors.hostingBlockContent2 = '*Exceeding limit';
  }

  if (!values.hostingBlockContent3) {
    errors.hostingBlockContent3 = '*Required';
  } else if (values.hostingBlockContent3.trim() == "") {
    errors.hostingBlockContent3 = '*Required';
  } else if (values.hostingBlockContent3 && values.hostingBlockContent3.length > 400) {
    errors.hostingBlockContent3 = '*Exceeding limit';
  }


  return errors
}

export default validate;
