
const validate = values => {

  const errors = {}

  if (!values.guestValue) {
    errors.guestValue = 'Provide fixed amount or percentage for Guest Fee';
  }

  if (!values.hostValue) {
    errors.hostValue = 'Provide fixed amount or percentage for Host Fee';
  }

  if (values.guestType === 'fixed' || values.hostType === 'fixed') {
    if (!values.currency) {
      errors.currency = 'Currency is required when you use fixed price';
    }
  }

  if (isNaN(values.guestValue)) {
    errors.guestValue = 'Only numeric values are allowed';
  }

  if (isNaN(values.hostValue)) {
    errors.hostValue = 'Only numeric values are allowed';
  }

  if (values.guestType === 'percentage') {
    if (values.guestValue && (parseInt(values.guestValue, 10) < 0 || parseInt(values.guestValue, 10) > 99)) {
      errors.guestValue = 'Choose percentage value between 1 to 99';
    }
  }

  if (values.hostType === 'percentage') {
    if (values.hostValue && (parseInt(values.hostValue, 10) < 0 || parseInt(values.hostValue, 10) > 99)) {
      errors.hostValue = 'Choose percentage value between 1 to 99';
    }
  }

  return errors
}

export default validate;
