import { sendForgotLink } from '../../../actions/ForgotPassword/sendForgotLink';

async function submit(values, dispatch) {
  dispatch(sendForgotLink(values.email));
}

export default submit;
