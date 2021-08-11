import { makePaymentForCancel } from '../../actions/booking/makePaymentForCancel';

async function submit(values, dispatch) {

	dispatch(makePaymentForCancel(
		values.reservationId,
		values.amount,
		values.currency,
		values.paymentCurrency,
		values.title
	)
	);
}

export default submit;