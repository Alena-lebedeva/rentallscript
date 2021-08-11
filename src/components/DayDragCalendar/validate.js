
import messages from '../../locale/messages';


const validate = values => {

    const errors = {};

    if (!values.isSpecialPrice) {
        errors.isSpecialPrice = messages.basePriceRequired;
    }

    if (values.isSpecialPrice > 0) {
        errors.isSpecialPrice = messages.basePriceRequired;
    }

    if (isNaN(values.isSpecialPrice) || (parseInt(values.basePrice, 3) < 1)) {
        errors.isSpecialPrice = messages.basePriceRequired;
    }

    return errors;
}

export default validate;
