import messages from '../../../locale/messages';

const validate = values => {

    const errors = {}

    if (!values.name) {
        errors.name = messages.nameRequired;
    } else if (values.name.trim() == "") {
        errors.name = messages.blankSpace;
    }

    return errors
}

export default validate
