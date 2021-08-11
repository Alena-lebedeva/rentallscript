import { cancel } from '../../actions/Reservation/cancelReservation';

async function submit(values, dispatch) {
  dispatch(cancel(
    values.reservationId,
    values.cancellationPolicy,
    values.refundToGuest,
    values.payoutToHost,
    values.guestServiceFee,
    values.hostServiceFee,
    values.total,
    values.currency,
    values.threadId,
    values.cancelledBy,
    values.message,
    values.checkIn,
    values.checkOut,
    values.guests,
    values.listTitle,
    values.confirmationCode,
    values.hostName,
    values.guestName,
    values.hostEmail,
    values.guestEmail
  )
  );
}

export default submit;