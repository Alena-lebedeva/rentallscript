const validate = values => {

  const errors = {}
  if (!values.faqTitle1) {
    errors.faqTitle1 = '*Required';
  } else if (values.faqTitle1 && values.faqTitle1.length > 200) {
    errors.faqTitle1 = '*Exceeding limit';
  } else if (values.faqTitle1 && values.faqTitle1.trim() == '') {
    errors.faqTitle1 = '*Required';
  }

  if (!values.faqContent1) {
    errors.faqContent1 = '*Required';
  } else if (values.faqContent1 && values.faqContent1.length > 400) {
    errors.faqContent1 = '*Exceeding limit';
  } else if (values.faqContent1 && values.faqContent1.trim() == '') {
    errors.faqContent1 = '*Required';
  }

  if (!values.faqTitle2) {
    errors.faqTitle2 = '*Required';
  } else if (values.faqTitle2 && values.faqTitle2.length > 200) {
    errors.faqTitle2 = '*Exceeding limit';
  } else if (values.faqTitle2 && values.faqTitle2.trim() == '') {
    errors.faqTitle2 = '*Required';
  }
  
  if (!values.faqContent2) {
    errors.faqContent2 = '*Required';
  } else if (values.faqContent2 && values.faqContent2.length > 400) {
    errors.faqContent2 = '*Exceeding limit';
  } else if (values.faqContent2 && values.faqContent2.trim() == '') {
    errors.faqContent2 = '*Required';
  }

  if (!values.faqTitle3) {
    errors.faqTitle3 = '*Required';
  } else if (values.faqTitle3 && values.faqTitle3.length > 200) {
    errors.faqTitle3 = '*Exceeding limit';
  } else if (values.faqTitle3 && values.faqTitle3.trim() == '') {
    errors.faqTitle3 = '*Required';
  }

  if (!values.faqContent3) {
    errors.faqContent3 = '*Required';
  } else if (values.faqContent3 && values.faqContent3.length > 400) {
    errors.faqContent3 = '*Exceeding limit';
  } else if (values.faqContent3 && values.faqContent3.trim() == '') {
    errors.faqContent3 = '*Required';
  }

  if (!values.faqTitle4) {
    errors.faqTitle4 = '*Required';
  } else if (values.faqTitle4 && values.faqTitle4.length > 200) {
    errors.faqTitle4 = '*Exceeding limit';
  } else if (values.faqTitle4 && values.faqTitle4.trim() == '') {
    errors.faqTitle4 = '*Required';
  }

  if (!values.faqContent4) {
    errors.faqContent4 = '*Required';
  } else if (values.faqContent4 && values.faqContent4.length > 400) {
    errors.faqContent4 = '*Exceeding limit';
  } else if (values.faqContent4 && values.faqContent4.trim() == '') {
    errors.faqContent4 = '*Required';
  }

  if (!values.faqTitle5) {
    errors.faqTitle5 = '*Required';
  } else if (values.faqTitle5 && values.faqTitle5.length > 200) {
    errors.faqTitle5 = '*Exceeding limit';
  } else if (values.faqTitle5 && values.faqTitle5.trim() == '') {
    errors.faqTitle5 = '*Required';
  }

  if (!values.faqContent5) {
    errors.faqContent5 = '*Required';
  } else if (values.faqContent5 && values.faqContent5.length > 400) {
    errors.faqContent5 = '*Exceeding limit';
  } else if (values.faqContent5 && values.faqContent5.trim() == '') {
    errors.faqContent5 = '*Required';
  }

  if (!values.faqTitle6) {
    errors.faqTitle6 = '*Required';
  } else if (values.faqTitle6 && values.faqTitle6.length > 200) {
    errors.faqTitle6 = '*Exceeding limit';
  } else if (values.faqTitle6 && values.faqTitle6.trim() == '') {
    errors.faqTitle6 = '*Required';
  }

  if (!values.faqContent6) {
    errors.faqContent6 = '*Required';
  } else if (values.faqContent6 && values.faqContent6.length > 400) {
    errors.faqContent6 = '*Exceeding limit';
  } else if (values.faqContent6 && values.faqContent6.trim() == '') {
    errors.faqContent6 = '*Required';
  }

  if (!values.faqTitle7) {
    errors.faqTitle7 = '*Required';
  } else if (values.faqTitle7 && values.faqTitle7.length > 200) {
    errors.faqTitle7 = '*Exceeding limit';
  } else if (values.faqTitle7 && values.faqTitle7.trim() == '') {
    errors.faqTitle7 = '*Required';
  }

  if (!values.faqContent7) {
    errors.faqContent7 = '*Required';
  } else if (values.faqContent7 && values.faqContent7.length > 400) {
    errors.faqContent7 = '*Exceeding limit';
  } else if (values.faqContent7 && values.faqContent7.trim() == '') {
    errors.faqContent7 = '*Required';
  }

  if (!values.faqTitle8) {
    errors.faqTitle8 = '*Required';
  } else if (values.faqTitle8 && values.faqTitle8.length > 200) {
    errors.faqTitle8 = '*Exceeding limit';
  } else if (values.faqTitle8 && values.faqTitle8.trim() == '') {
    errors.faqTitle8 = '*Required';
  }

  if (!values.faqContent8) {
    errors.faqContent8 = '*Required';
  } else if (values.faqContent8 && values.faqContent8.length > 400) {
    errors.faqContent8 = '*Exceeding limit';
  } else if (values.faqContent8 && values.faqContent8.trim() == '') {
    errors.faqContent8 = '*Required';
  }
  


  return errors
}

export default validate;
