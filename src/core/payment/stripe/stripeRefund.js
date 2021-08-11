import stripePackage from 'stripe';
import { payment } from '../../../config';
const stripe = stripePackage(payment.stripe.secretKey);
import { createTransaction } from './helpers/createTransaction';

const stripeRefund = app => {
    app.post('/stripe-refund', async function (req, res) {

        if (req.user && req.user.admin == true) {

            const reservationDetails = req.body.reservationDetails;
            let amount, reservationId, currency;
            let status = 200, errorMessage, refund, transactionId, refundType = 'charge';
            if (reservationDetails) {
                transactionId = reservationDetails.transactionId;
                refundType = (transactionId && transactionId.indexOf("ch_") >= 0) ? 'charge' : 'payment_intent';
                amount = reservationDetails.amount;
                currency = reservationDetails.currency;
                reservationId = reservationDetails.reservationId;
                
            } else {
                status = 400;
                errorMessage = 'Something Went Wrong, please try again';
            }

            if (status === 200 && amount && transactionId) {
                try {
                    refund = await stripe.refunds.create({
                        [refundType]: transactionId,
                        amount: Math.round(amount * 100),
                    });
                } catch (error) {
                    status = 400;
                    errorMessage = error.message;
                }
            }

            if (status === 200 && refund && 'id' in refund) {
                // Update Transactions
                await createTransaction(
                    reservationDetails.reservationId,
                    null,
                    null,
                    refund.id,
                    Math.round(reservationDetails.amount),
                    reservationDetails.currency,
                    'cancellation',
                    2
                );
                res.send({ status, errorMessage });
            }

        } else {
            return res.send({ status: 400, errorMessage: 'User not authenticated' })
        }


    });
};

export default stripeRefund;