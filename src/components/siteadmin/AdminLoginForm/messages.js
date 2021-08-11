import { defineMessages } from 'react-intl';

const messages = defineMessages({
  email: {
    id: 'adminLoginform.email',
    defaultMessage: 'Email Address',
    description: 'Your Email Address to Login',
  },
  emailRequired: {
    id: 'adminLoginform.emailRequired',
    defaultMessage: 'Email is required',
    description: 'Email is required',
  },
  emailInvalid: {
    id: 'adminLoginform.emailInValid',
    defaultMessage: 'Invalid Email Address',
    description: 'Invalid Email Address',
  },
  emailNotExists: {
    id: 'adminLoginform.emailNotExists',
    defaultMessage: 'No account exists for this email. Make sure it\'s typed in correctly, or “sign up” instead',
    description: 'Email Address is not exist',
  },
  password: {
    id: 'adminLoginform.password',
    defaultMessage: 'Password',
    description: 'Your Password to Login',
  },
  passwordRequired: {
    id: 'adminLoginform.passwordRequired',
    defaultMessage: 'Password is required',
    description: 'Password is required',
  },
  passwordInvalid: {
    id: 'adminLoginform.passwordInValid',
    defaultMessage: 'Your password must be at least 8 characters. Please try again',
    description: 'Invalid Password',
  },
  passwordWrong: {
    id: 'adminLoginform.passwordWrong',
    defaultMessage: 'Wrong Password. Please try again',
    description: 'Wrong Password',
  },
  somethingWentWrong: {
    id: 'adminLoginform.somethingWentWrong',
    defaultMessage: 'Sorry, something went wrong. Please try again',
    description: 'Wrong went wrong',
  },
  loggedIn: {
    id: 'adminLoginform.loggedIn',
    defaultMessage: 'You are already logged in!',
    description: 'You are already Logged-in',
  },
  userLoggedIn: {
    id: 'adminLoginform.userLoggedIn',
    defaultMessage: 'You are already logged in as User, please logout in the main site to continue!',
    description: 'You are already Logged-in as user',
  }

});

export default messages;
