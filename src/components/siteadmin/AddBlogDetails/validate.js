const validate = values => {

  const errors = {}

  if (!values.metaTitle) {
    errors.metaTitle = 'Meta Title is Required';
  }

  if (!values.metaDescription) {
    errors.metaDescription = 'Meta Description is Required';
  }

  if (!values.pageUrl) {
    errors.pageUrl = 'Page URL is Required';
  }
  else {
    var slashCount = (values.pageUrl.match(/\//g) || []).length;
    var questionCount = (values.pageUrl.match(/\?/g) || []).length;
    var andCount = (values.pageUrl.match(/\&/g) || []).length;
    if (slashCount >= 1 || questionCount >= 1 || andCount >= 1) {
      errors.pageUrl = 'Invalid Page URL';
    }
  }

  if (!values.pageTitle) {
    errors.pageTitle = 'Page Title is Required';
  }

  if (!values.content) {
    errors.content = 'Blog Content is Required';
  }

  return errors
}

export default validate
