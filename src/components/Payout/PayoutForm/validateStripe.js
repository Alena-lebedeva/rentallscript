import messages from '../../../locale/messages';

const validate = values => {

    const errors = {}

    if (!values.country) {
        errors.country = messages.required;
    }

    if (!values.city) {
        errors.city = messages.required;
    }

    if (!values.state) {
        errors.state = messages.required;
    }

    if (!values.zipcode) {
        errors.zipcode = messages.required;
    }

    if (!values.firstname || (values.firstname && values.firstname.toString().trim() == '')) {
        errors.firstname = messages.required;
    }

    if (values.businessType && values.businessType === "individual" 
        && (!values.lastname || (values.lastname && values.lastname.toString().trim() == ''))) {
        errors.lastname = messages.required;
    }

    if (!values.routingNumber) {
        errors.routingNumber = messages.required;
    } else if (isNaN(values.routingNumber) || (parseInt(values.routingNumber, 10) < 1)) {
        errors.routingNumber = messages.payoutRoutingInvalid;
    }

    if (!values.accountNumber) {
        errors.accountNumber = messages.required;
    } else if (isNaN(values.accountNumber) || (parseInt(values.accountNumber, 10) < 1)) {
        errors.accountNumber = messages.accountNumberInvalid;
    }

    if (!values.confirmAccountNumber) {
        errors.confirmAccountNumber = messages.required;
    } else if (isNaN(values.confirmAccountNumber) || (parseInt(values.confirmAccountNumber, 10) < 1)) {
        errors.confirmAccountNumber = messages.confirmAccountNumberInvalid;
    }

    if (values.confirmAccountNumber && values.accountNumber) {
        if (values.confirmAccountNumber !== values.accountNumber) {
            errors.confirmAccountNumber = messages.confirmAccountNumberMismatch;
        }
    }

    if (values.country && values.country === 'US' && values.businessType && values.businessType === "individual") {
        if (!values.ssn4Digits) {
            errors.ssn4Digits = messages.required;
        } else if (values.ssn4Digits) {
            if (isNaN(values.ssn4Digits) || (parseInt(values.ssn4Digits, 10) < 1)) {
                errors.ssn4Digits = messages.ssn4DigitsInvalid;
            }
        }
    }
    
    if (!values.business_type) {
        errors.business_type = messages.required;
    } 

    return errors
}

export default validate;