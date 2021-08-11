import messages from '../../locale/messages';
const validate = values => {

    const errors = {}

    if (!values.name) {
        errors.name = messages.required;
    } else if (values.name.trim() == "") {
        errors.name = messages.required;
    }

    if (!values.email) {
        errors.email = messages.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
        errors.email = messages.emailInvalid;
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = messages.required;
    } else if (values.phoneNumber.trim() == "") {
        errors.phoneNumber = messages.required;
    }

    if (!values.ContactMessage) {
        errors.ContactMessage = messages.required;
    } else if (values.ContactMessage.trim() == "") {
        errors.ContactMessage = messages.required;
    }

    if (!values.reCaptcha) {
        errors.reCaptcha = messages.required;
    }
    return errors
}
export default validate
