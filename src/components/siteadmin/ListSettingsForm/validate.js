import messages from './messages';

const validate = values => {

  const errors = {}

  if (!values.itemName) {
    errors.itemName = messages.itemNameIsRequired;
  } else if (values.itemName && values.itemName.trim() == "") {
    errors.itemName = messages.blankSpace;
  } else if (values.itemName && values.itemName.length > 255) {
    errors.itemName = messages.exceedLimit;
  }

  if (!values.otherItemName) {
    errors.otherItemName = messages.otherItemNameIsRequired;
  }

  if (values.startValue != 0 && values.startValue < 0) {
    if (Number(values.startValue) || Number(values.startValue) != parseInt(values.startValue, 10)) {
      errors.startValue = messages.startValueIsInvalid;
    }
  }

  if (!Number(values.endValue) || Number(values.endValue) != parseInt(values.endValue, 10)) {
    errors.endValue = messages.endValueIsInvalid;
  }

  if (Number(values.endValue) < Number(values.startValue)) {
    errors.endValue = messages.endValueGreater;
  }

  if (values.itemDescription && values.itemDescription.trim() == "") {
    // errors.itemDescription = messages.descriptionEmpty;
    errors.itemDescription = messages.blankSpace;
  }

  return errors
}

export default validate
