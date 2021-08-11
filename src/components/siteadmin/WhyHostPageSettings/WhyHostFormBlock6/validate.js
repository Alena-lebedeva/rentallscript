const validate = values => {

  const errors = {}

  if (!values.quoteSectionTitle1) {
    errors.quoteSectionTitle1 = '*Required';
  } else if (values.quoteSectionTitle1.trim() == "") {
    errors.quoteSectionTitle1 = '*Required';
  } else if (values.quoteSectionTitle1 && values.quoteSectionTitle1.length > 200) {
    errors.quoteSectionTitle1 = '*Exceeding limit';
  }

  if (!values.quoteSectionTitle2) {
    errors.quoteSectionTitle2 = '*Required';
  } else if (values.quoteSectionTitle2.trim() == "") {
    errors.quoteSectionTitle2 = '*Required';
  } else if (values.quoteSectionTitle2 && values.quoteSectionTitle2.length > 200) {
    errors.quoteSectionTitle2 = '*Exceeding limit';
  }

  if (!values.quoteSectionContent1) {
    errors.quoteSectionContent1 = '*Required';
  } else if (values.quoteSectionContent1.trim() == "") {
    errors.quoteSectionContent1 = '*Required';
  } else if (values.quoteSectionContent1 && values.quoteSectionContent1.length > 400) {
    errors.quoteSectionContent1 = '*Exceeding limit';
  }

  if (!values.quoteSectionContent2) {
    errors.quoteSectionContent2 = '*Required';
  } else if (values.quoteSectionContent2.trim() == "") {
    errors.quoteSectionContent2 = '*Required';
  } else if (values.quoteSectionContent2 && values.quoteSectionContent2.length > 400) {
    errors.quoteSectionContent2 = '*Exceeding limit';
  }

  if (!values.quoteSectionButton1) {
    errors.quoteSectionButton1 = '*Required';
  } else if (values.quoteSectionButton1.trim() == "") {
    errors.quoteSectionButton1 = '*Required';
  } else if (values.quoteSectionButton1 && values.quoteSectionButton1.length > 50) {
    errors.quoteSectionButton1 = '*Exceeding limit';
  }

  if (!values.quoteSectionButton2) {
    errors.quoteSectionButton2 = '*Required';
  } else if (values.quoteSectionButton2.trim() == "") {
    errors.quoteSectionButton2 = '*Required';
  } else if (values.quoteSectionButton2 && values.quoteSectionButton2.length > 50) {
    errors.quoteSectionButton2 = '*Exceeding limit';
  }


  return errors
}

export default validate;
