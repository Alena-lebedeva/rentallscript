const validate = values => {

  const errors = {}

  if (!values.headerTitle) {
    errors.headerTitle = 'Title is required';
  } else if (values.headerTitle.trim() == "") {
    errors.headerTitle = 'Input is Blank';
  }

  if (!values.headerContent) {
    errors.headerContent = 'Content is required';
  } else if (values.headerContent.trim() == "") {
    errors.headerContent = 'Input is Blank';
  }

  if (!values.blockTitle1) {
    errors.blockTitle1 = 'Title is required';
  } else if (values.blockTitle1.trim() == "") {
    errors.blockTitle1 = 'Input is Blank';
  }

  if (!values.blockContent1) {
    errors.blockContent1 = 'Content is required';
  } else if (values.blockContent1.trim() == "") {
    errors.blockContent1 = 'Input is Blank';
  }

  if (!values.blockTitle2) {
    errors.blockTitle2 = 'Title is required';
  } else if (values.blockTitle2.trim() == "") {
    errors.blockTitle2 = 'Input is Blank';
  }

  if (!values.blockContent2) {
    errors.blockContent2 = 'Content is required';
  } else if (values.blockContent2.trim() == "") {
    errors.blockContent2 = 'Input is Blank';
  }

  return errors
}

export default validate;
