const validate = values => {

    const errors = {}

    if (values.email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
            errors.email = 'Invalid Email Address';
        }
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be minimum 8 characters';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword.length < 8) {
        errors.confirmPassword = 'Confirm Password must be minimum 8 characters';
    }

    if (values.password && values.confirmPassword) {
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Password is mismatching with Confirm password';
        }
    }

    return errors
}

export default validate;