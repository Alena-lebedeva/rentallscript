
const validate = values => {

    const errors = {}

    // if (!values.listId) {
    //     errors.listId = 'Provide list ID';
    // } else if (isNaN(values.listId)) {
    //     errors.listId = 'Only numeric values are allowed';
    // }

    if (!values.reviewContent) {
        errors.reviewContent = 'Please write your review';
    }

    if (!values.rating) {
        errors.rating = 'Please rate your review';
    }

    return errors
}

export default validate;