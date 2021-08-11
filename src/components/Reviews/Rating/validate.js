import messages from '../../../locale/messages';

const validate = values => {

    const errors = {};

    if (!values.reviewContent) {
        errors.reviewContent = messages.required;
    }else if (values.reviewContent.trim() == "") {
        errors.reviewContent = messages.required;
    }

    if (!values.rating) {
        errors.rating = messages.required;
    }

    return errors;
};

export default validate;
