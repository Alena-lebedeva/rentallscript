import { Transaction } from '../../data/models';

export async function createTransaction(
  reservationId,
  payerEmail,
  payerId,
  receiverEmail,
  receiverId,
  transactionId,
  total,
  transactionFee,
  currency,
  ipn_track_id
) {

  const transaction = await Transaction.findOrCreate({
    where: {
      reservationId,
      transactionId
    },
    defaults: {
      //properties you want on create
      reservationId,
      payerEmail,
      payerId,
      receiverEmail,
      receiverId,
      transactionId,
      total,
      transactionFee,
      currency,
      ipn_track_id
    }
  });

  if (transaction) {
    if (ipn_track_id && ipn_track_id != '') {
      const updateIPN = await Transaction.update({
        ipn_track_id
      },
        {
          where: {
            id: reservationId,
            transactionId
          }
        })
    }
    return {
      status: 'created'
    };
  } else {
    return {
      status: 'failed to create transaction'
    }
  }
}