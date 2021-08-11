import { makePayment } from '../../../actions/booking/makePayment';
import fetch from '../../../core/fetch';
import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {

  let paymentType = values.paymentType;
  let name = values.paymentType == 2 ? values.name : null;
  let cardNumber = values.paymentType == 2 ? values.cardNumber : null;
  let cvv = values.paymentType == 2 ? values.cvv : null;
  let expiryDate = values.paymentType == 2 ? values.expiryDate : null;
  let expiryYear = values.paymentType == 2 ? values.expiryYear : null;
  let paymentCurrency = values.paymentType == 1 ? values.paymentCurrency : null;

  let query = `query checkReservation ($checkIn: String,$checkOut: String,$listId: Int ){
    checkReservation(checkIn: $checkIn, checkOut:$checkOut, listId:$listId ){
      id
      listId
      hostId
      guestId
      checkIn
      checkOut
      status
    }
  }`;

  const params = {
    listId: values.listId,
    checkIn: values.checkIn,
    checkOut: values.checkOut,
  };

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: params,
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data && data.checkReservation) {
    if (data.checkReservation.status == "200") {
      dispatch(makePayment(
        values.listId,
        values.listTitle,
        values.hostId,
        values.guestId,
        values.checkIn,
        values.checkOut,
        values.guests,
        values.message,
        values.basePrice,
        values.cleaningPrice,
        values.currency,
        values.discount,
        values.discountType,
        values.guestServiceFee,
        values.hostServiceFee,
        values.total,
        values.bookingType,
        paymentCurrency,
        paymentType,
        name,
        cardNumber,
        cvv,
        expiryDate,
        expiryYear,
        values.guestEmail,
        values.bookingSpecialPricing,
        values.isSpecialPriceAssigned,
        values.isSpecialPriceAverage,
        values.dayDifference
      )
      );
    }
    else {
      toastr.error("Booking Failed", "The dates are not available!");
    }

  }
  //dispatch(reset('PaymentForm'));
}

export default submit;
