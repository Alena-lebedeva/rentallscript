import { Transaction } from '../../../data/models';

export async function createTransaction(
  reservationId,
  receiverEmail,
  receiverId,
  payerId,
  payerEmail,
  transactionId,
  total,
  transactionFee,
  currency
) {

  const transaction = await Transaction.findOrCreate({
    where: {
      reservationId,
      paymentType: 'cancellation'
    },
    defaults: {
      //properties you want on create
      reservationId,
      receiverEmail,
      receiverId,
      payerId,
      payerEmail,
      transactionId,
      total,
      transactionFee,
      currency,
      paymentType: 'cancellation'
    }
  });
}