import paypal from 'paypal-rest-sdk';
import { payment as config } from '../../config';
import { updateReservation } from './updateReservation';
import { createTransaction } from './createTransaction';
import { createThread } from './createThread';
import { blockDates } from './blockDates';
import { emailBroadcast } from './email';

const paypalRoutes = app => {

  var paymentConfig = {
    "api": {
      "host": config.paypal.host,
      "port": '',
      "client_id": config.paypal.clientId,  // your paypal application client id
      "client_secret": config.paypal.secret // your paypal application secret id
    }
  }

  paypal.configure(paymentConfig.api);

  app.get('/cancel', async function (req, res) {
    
    
    var reservationId = req.query.id;
    
    res.redirect('/payment/' + reservationId);
  });

  app.post('/ipn_handler', async function (req, res) {
    var itemSKU, payerEmail, payerId, receiverEmail, receiverId, transactionId, total, currency, transactionFee, ipn_track_id;
    itemSKU = req.body.item_number1;
    payerEmail = req.body.payer_email;
    payerId = req.body.payer_id;
    receiverEmail = req.body.receiver_email;
    receiverId = req.body.receiver_id;
    transactionId = req.body.txn_id;
    total = req.body.payment_gross;
    if (req.body.payment_fee != undefined) {
      transactionFee = req.body.payment_fee;
    }
    currency = req.body.mc_currency;
    ipn_track_id = req.body.ipn_track_id;
    if (req.body.payment_status === 'Completed') {
      await updateReservation(itemSKU);
      await createTransaction(
        itemSKU,
        payerEmail,
        payerId,
        receiverEmail,
        receiverId,
        transactionId,
        total,
        transactionFee,
        currency,
        ipn_track_id
      );
      await createThread(itemSKU);
      await blockDates(itemSKU);
      await emailBroadcast(itemSKU);
    }
    res.send("Payment status from ipn_handler.");
  });

  app.get('/success', function (req, res) {

    var paymentId = req.query.paymentId;
    var payerId = req.query.PayerID;
    var details = { "payer_id": payerId };

    paypal.payment.execute(paymentId, details, async function (error, payment) {
      if (error) {
        console.log(error);
      } else {
        var amount, payee, item_list, related_resources, rrAmount, rrTranscationFee, itemSKU, transactionId;
        payment.transactions.map((item) => {
          amount = item.amount;
          payee = item.payee;
          item_list = item.item_list;
          related_resources = item.related_resources;
          related_resources.map((relatedItem) => {
            transactionId = relatedItem.sale.id;
            rrAmount = relatedItem.sale.amount;
            if (relatedItem.sale.transaction_fee != undefined) {
              rrTranscationFee = relatedItem.sale.transaction_fee.value;
            }
          })
        })
        item_list.items.map((itemData) => {
          itemSKU = Number(itemData.sku);
        })

        let payerEmail = payment.payer.payer_info.email;
        let payerId = payment.payer.payer_info.payer_id;
        let receiverEmail = payee.email;
        let receiverId = payee.merchant_id;
        let total = rrAmount.total;
        let transactionFee = rrTranscationFee;
        let currency = rrAmount.currency;
        /*console.log('itemSKU', itemSKU);
        console.log('payerEmail', payerEmail);
        console.log('payerId', payerId);
        console.log('receiverEmail', receiverEmail);
        console.log('receiverId', receiverId);
        console.log('transactionId', transactionId);
        console.log('total', total);
        console.log('transactionFee', transactionFee);
        console.log('currency', currency);
        res.send('success');*/

        await updateReservation(itemSKU);
        await createTransaction(
          itemSKU,
          payerEmail,
          payerId,
          receiverEmail,
          receiverId,
          transactionId,
          total,
          transactionFee,
          currency,
          ""
        );
        await createThread(itemSKU);
        await blockDates(itemSKU);
        await emailBroadcast(itemSKU);
        res.redirect(config.paypal.redirectURL.success + "/" + itemSKU);
      }
    });

  });

  app.post('/paynow', function (req, res) {
    // paypal payment configuration.
    var payment = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": config.paypal.returnURL,
        "cancel_url": config.paypal.cancelURL + '?id=' + req.body.reservationId
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": req.body.description,
            "sku": req.body.reservationId,
            "price": req.body.amount,
            "currency": req.body.currency,
            "quantity": 1
          }]
        },
        "amount": {
          "currency": req.body.currency,
          "total": req.body.amount
        },
        "description": "This is the payment description."
      }]

    };

    paypal.payment.create(payment, function (error, payment) {
      if (error) {
        console.log('error from paynow', error);
      } else {
        if (payment.payer.payment_method === 'paypal') {
          req.paymentId = payment.id;
          var redirectUrl;
          for (var i = 0; i < payment.links.length; i++) {
            var link = payment.links[i];
            if (link.method === 'REDIRECT') {
              redirectUrl = link.href;
            }
          }
          res.send({ redirect: redirectUrl });
        }
      }
    });
  });

};

export default paypalRoutes;