// Redux Actions
import { payoutHost } from '../../../../actions/Reservation/payoutHost';
import { refundGuest } from '../../../../actions/Reservation/refundGuest';
import { closeReservationModal } from '../../../../actions/Reservation/payoutModal';

async function submit(values, dispatch) {
	let paymentCurrency = values.paymentMethodId == 1 ? values.paymentCurrency : null;

	if (values.type === 'host') {
		paymentCurrency = values.paymentMethodId == 2 ? values.payoutCurrency : paymentCurrency;
		dispatch(
			payoutHost(
				values.reservationId,
				values.receiverEmail,
				values.payoutId,
				values.amount,
				values.currency,
				paymentCurrency,
				values.hostId,
				values.paymentMethodId,
				values.hostEmail
			)
		);
		dispatch(closeReservationModal());
	}

	if (values.type === 'guest') {
		dispatch(
			refundGuest(
				values.reservationId,
				values.receiverEmail,
				values.receiverId,
				values.payerEmail,
				values.payerId,
				values.amount,
				values.currency,
				paymentCurrency,
				values.paymentMethodId,
				values.transactionId
			)
		);
		dispatch(closeReservationModal());
	}
}

export default submit;
