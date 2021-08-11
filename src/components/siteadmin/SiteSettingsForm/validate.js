import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.siteName) {
    errors.siteName = messages.required && messages.required.defaultMessage;
  }

  if (!values.siteTitle) {
    errors.siteTitle = messages.required && messages.required.defaultMessage;
  }

  if (values.logoHeight) {
    if (isNaN(values.logoHeight)) {
      errors.logoHeight = messages.logoHeight && messages.logoHeight.defaultMessage;
    }
  }

  if (values.logoWidth) {
    if (isNaN(values.logoWidth)) {
      errors.logoWidth = messages.logoWidth && messages.logoWidth.defaultMessage;
    }
  }

  if(values.metaDescription && values.metaDescription.length > 255) {
    errors.metaDescription = messages.metaDescription && messages.metaDescription.defaultMessage
  }

  if(values.metaKeyword && values.metaKeyword.length > 255) {
    errors.metaKeyword = messages.metaKeyword && messages.metaKeyword.defaultMessage
  }

  if ( (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.playStoreUrl)) ){
    errors.playStoreUrl = messages.urlInvalid.defaultMessage;
  }
  
  if ( (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.appStoreUrl)) ){
    errors.appStoreUrl = messages.urlInvalid.defaultMessage;
  }

  if (!values.email) {
    errors.email = messages.required && messages.required.defaultMessage;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid && messages.emailInvalid.defaultMessage;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.required && messages.required.defaultMessage;
  } else if (values.phoneNumber && values.phoneNumber.trim() == "") {
    errors.phoneNumber = messages.required && messages.required.defaultMessage;
  } else if (values.phoneNumber.length > 30 ) {
    errors.phoneNumber = messages.phoneNumberLengthInvalid.defaultMessage;
  }

  if (!values.address) {
    errors.address = messages.required && messages.required.defaultMessage;
  }
  return errors
}

export default validate;
