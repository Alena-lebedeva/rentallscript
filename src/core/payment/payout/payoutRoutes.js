import paypal from 'paypal-rest-sdk';
import { payment as config } from '../../../config';
import { createTransactionHistory } from './createTransactionHistory';
import { Reservation, CurrencyRates, Currencies, TransactionHistory, CancellationDetails } from '../../../data/models';
import { convert } from '../../../helpers/currencyConvertion';

const payoutRoutes = app => {

  var paymentConfig = {
    "api": {
      "host": config.paypal.host,
      "port": '',
      "client_id": config.paypal.clientId,  // your paypal application client id
      "client_secret": config.paypal.secret // your paypal application secret id
    }
  }

  paypal.configure(paymentConfig.api);

  app.post('/payout', async function (req, res) {
    // paypal payment configuration.
    try {
      if (req.user && req.user.admin == true) {
        var sender_batch_id = Math.random().toString(36).substring(9);
        var reservationId = req.body.reservationId;
        var hostEmail = req.body.hostEmail;
        var payoutId = req.body.payoutId;
        var amount = req.body.amount;
        var currency = req.body.currency;
        var userId = req.body.userId;
        var paymentMethodId = req.body.paymentMethodId;
        let status, errorMessage;

        const transactionHistory = await TransactionHistory.findOne({
          where: {
            reservationId
          }
        });

        if (transactionHistory) {
          status = 400;
          errorMessage = 'Invalid request';
        } else {
          const reservation = await Reservation.findOne({
            where: {
              id: reservationId,
              reservationState: 'completed'
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
            errorMessage = 'Invalid requestss';
          };
        };

        if (status == 200) {
          var create_payout_json = {
            "sender_batch_header": {
              "sender_batch_id": sender_batch_id,
              "email_subject": "You have a payment"
            },
            "items": [
              {
                "recipient_type": "EMAIL",
                "amount": {
                  "value": amount,
                  "currency": currency
                },
                "receiver": hostEmail,
                "note": "Thank you.",
                "sender_item_id": reservationId
              }
            ]
          };

          var sync_mode = 'false';

          paypal.payout.create(create_payout_json, sync_mode, async function (error, payout) {
            if (error) {
              res.send({ status: error.response, errorMessage: error.response && error.response.message });
              throw error;
            } else {
              var batchId = payout.batch_header.payout_batch_id;
              var batchStatus = payout.batch_header.batch_status;
              var fees = payout.batch_header.fees && payout.batch_header.fees.value;
              if (batchStatus && batchStatus === 'SUCCESS') {
                await createTransactionHistory(
                  reservationId,
                  hostEmail,
                  payoutId,
                  amount,
                  fees,
                  currency,
                  userId,
                  paymentMethodId
                );
                res.send({ status: batchStatus });
              } else {
                if (batchStatus === 'PENDING') {
                  let getPayoutInfo = paypal.payout.get(batchId, async function (getError, getResponse) {
                    if (getError) {
                      res.send({ status: getError.response, errorMessage: getError.response && getError.response.message });
                      //throw getError;
                    } else {
                      batchStatus = getResponse.batch_header.batch_status;
                      if (getResponse && getResponse.batch_header && (batchStatus === 'PENDING' || batchStatus === 'SUCCESS')) {
                        fees = getResponse.batch_header.fees && getResponse.batch_header.fees.value;

                        await createTransactionHistory(
                          reservationId,
                          hostEmail,
                          payoutId,
                          amount,
                          fees,
                          currency,
                          userId,
                          paymentMethodId
                        );
                      }
                      res.send({ status: batchStatus });
                    }
                  });
                } else {
                  res.send({ status: batchStatus });
                }
              }
            }
          });
        } else {
          res.send({ status: 400, errorMessage });
        };


      } else {
        res.send({ status: 400, errorMessage: 'Invalid request' });
      };
    } catch (err) {
      res.send({ status: 400, errorMessage: err})
    }

  });
};

export default payoutRoutes;