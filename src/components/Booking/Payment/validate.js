import messages from '../../../locale/messages';
import valid from 'card-validator';

const validate = values => {

  const errors = {}

  if (!values.message) {
    errors.message = messages.required;
  } else if (values.message && values.message.toString().trim() == '') {
    errors.message = messages.required;
  }

  if (values.paymentType == 1 && !values.paymentCurrency) {
    errors.paymentCurrency = messages.required;
  }

  if (values.paymentType == 2) {
    if (!values.name) {
      errors.name = messages.required;
    } else if (values.name && values.name.toString().trim() == '') {
      errors.name = messages.required;
    }

    if (!values.cardNumber) {
      errors.cardNumber = messages.required;
    } else {
      var numberValidation = valid.number(values.cardNumber);
      if (!numberValidation.isValid) {
        errors.cardNumber = messages.invalid;
      }
    }

    if (!values.expiryDate) {
      errors.expiryDate = messages.required;
    } else {
      var monthValidation = valid.expirationMonth(values.expiryDate);
      if (!monthValidation.isValid) {
        errors.expiryDate = messages.invalid;
      }
    }

    if (!values.expiryYear) {
      errors.expiryYear = messages.required;
    } else {
      var yearValidation = valid.expirationYear(values.expiryYear);
      if (!yearValidation.isValid) {
        errors.expiryYear = messages.invalid;
      }
    }

    if (!values.cvv) {
      errors.cvv = messages.required;
    } else {
      var maximumLength = 3;
      var numberValidation = valid.number(values.cardNumber);
      if (values.cardNumber && numberValidation.isValid) {
        var cardType = valid.number(values.cardNumber);
        if (cardType.card.type === 'american-express') {
          maximumLength = 4;
        }
      }
      var cvvValidation = valid.cvv(values.cvv, maximumLength);
      if (!cvvValidation.isValid) {
        errors.cvv = messages.invalid;
      }
    }
  }

  return errors;
}

export default validate;