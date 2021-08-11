import stripePackage from 'stripe';
import { payment } from '../../../config';
const stripe = stripePackage(payment.stripe.secretKey);
import { createTransactionHistory } from './helpers/createTransactionHistory';
import { Reservation, Currencies, CurrencyRates, TransactionHistory, CancellationDetails } from '../../../data/models';
import { convert } from '../../../helpers/currencyConvertion';

const stripePayout = app => {
    app.post('/stripe-payout', async function (req, res) {

        if (req.user && req.user.admin == true) {
            const reservationDetails = req.body.reservationDetails;
            let destination, transfer_group, amount, reservationId, currency;
            let status = 200, errorMessage, payout, userId, hostEmail, payoutId;
            if (reservationDetails) {
                destination = reservationDetails.destination;
                transfer_group = reservationDetails.transfer_group;
                amount = reservationDetails.amount;
                currency = reservationDetails.currency;
                reservationId = reservationDetails.reservationId;
                userId = reservationDetails.userId;
                hostEmail = reservationDetails.hostEmail;
                payoutId = reservationDetails.payoutId;

                const transactionHistory = await TransactionHistory.findOne({
                    where: {
                        reservationId
                    }
                })

                if (transactionHistory) {
                    status = 400;
                    errorMessage = 'Invalid request';
                } else {
                    const reservation = await Reservation.findOne({
                        where: {
                            id: reservationId
                        },
                        raw: true
                    });

                    var ratesData = {};

                    const data = await CurrencyRates.findAll();
                    const base = await Currencies.findOne({ where: { isBaseCurrency: true } });

                    if (data) {
                        data.map((item) => {
                            ratesData[item.dataValues.currencyCode] = item.dataValues.rate;
                        })
                    };


                    if (reservation) {

                        if (reservation.reservationState == 'completed') {

                            let reservationPayoutAmount = reservation.total - reservation.hostServiceFee;
                            let reservationAmountConversion = convert(base.symbol, ratesData, reservationPayoutAmount, reservation.currency, currency);

                            amount <= reservationAmountConversion.toFixed(2)
                                ?
                                status = 200 : (status = 400, errorMessage = 'Invalid request');

                        } else if (reservation.reservationState == 'cancelled') {

                            let cancelData = await CancellationDetails.findOne({
                                where: {
                                    reservationId
                                }
                            });

                            let cancelDataAmount = convert(base.symbol, ratesData, cancelData.payoutToHost, cancelData.currency, currency);

                            amount <= cancelDataAmount.toFixed(2)
                            ?
                            status = 200 : (status = 400, errorMessage = 'Invalid request');

                        } else {
                            status = 400;
                            errorMessage = 'Invalid request';
                        }


                    } else {
                        status = 400;
                        errorMessage = 'Invalid request';
                    }
                }

            } else {
                status = 400;
                errorMessage = 'Something Went Wrong, please try again';
            }

            if (status === 200) {
                try {
                    payout = await stripe.transfers.create({
                        amount: Math.round(amount * 100),
                        currency,
                        destination,
                        transfer_group,
                        metadata: {
                            reservationId,
                            type: 'payout',
                            hostEmail: hostEmail
                        }
                    });
                } catch (error) {
                    status = 400;
                    errorMessage = error.message;
                }
            }

            if (status === 200 && payout && 'id' in payout) {
                // Update Transactions
                /*await createTransaction(
                    reservationDetails.reservationId,
                    null,
                    null,
                    payout.id,
                    Math.round(reservationDetails.amount),
                    reservationDetails.currency,
                    'host'
                );*/
                await createTransactionHistory(
                    reservationDetails.reservationId,
                    hostEmail,
                    payoutId,
                    payout.id,
                    Math.round(reservationDetails.amount),
                    reservationDetails.currency,
                    userId,
                    2
                );
            }
            res.send({ status, errorMessage });
        } else {
            return res.send({ status: 400, errorMessage: 'User not authenticated' });
        }


    });
};

export default stripePayout;