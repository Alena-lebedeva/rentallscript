import stripePackage from 'stripe';
import { payment } from '../../../config';
const stripe = stripePackage(payment.stripe.secretKey);
import { getCustomerId } from './helpers/getCustomerId';
import { updateUserProfile } from './helpers/updateUserProfile';
import { updateReservation } from './helpers/updateReservation';
import { createTransaction } from './helpers/createTransaction';
import { createThread } from './helpers/createThread';
import { blockDates } from './helpers/blockDates';
import { emailBroadcast } from './helpers/email';

const stripePayment = app => {
    app.post('/stripe-reservation', async function (req, res) {
        const cardDetails = req.body.cardDetails;
        const reservationDetails = req.body.reservationDetails;
        const paymentMethodId = req.body.paymentMethodId
        let createCard, createCustomer, source, charge, customerId, intent, paymentIntentSecret;
        let status = 200, errorMessage, requireAdditionalAction = false, paymentIntentId;
        if (reservationDetails) {
            // Check if stripe customer id is already created
            customerId = await getCustomerId(reservationDetails.guestId);
        } else {
            status = 400;
            errorMessage = 'Sorry, something went wrong. Please try again.';
        }

        // If customer doesn't exist, create a customer
        if (!customerId && status === 200) {
            try {
                createCustomer = await stripe.customers.create(
                    { email: reservationDetails.guestEmail }
                );
                if ('id' in createCustomer) {
                    customerId = createCustomer.id;
                    await updateUserProfile(
                        reservationDetails.guestId,
                        customerId
                    );
                }
            } catch (error) {
                status = 400;
                errorMessage = error.message;
            }
        }

        // Create Card to get a token to make a payment
        // if (cardDetails && status === 200) {
        //     try {
        //         createCard = await stripe.tokens.create({
        //             card: cardDetails
        //         });
        //     } catch (error) {
        //         status = 400;
        //         errorMessage = error.message;
        //     }
        // }

        // Create source for the customer 
        // if (customerId && createCard && status === 200) {
        //     let id = customerId;

        //     try {
        //         source = await stripe.customers.createSource(id, {
        //             source: createCard.id
        //         });
        //     } catch (error) {
        //         status = 400;
        //         errorMessage = error.message;
        //     }
        // }

        // If there is no error, the  proceed with charging
        if (status === 200) {
            try {

                // creating the payment intents with the payment method id.
                intent = await stripe.paymentIntents.create({
                    payment_method: paymentMethodId,
                    amount: Math.round(reservationDetails.amount * 100),
                    currency: reservationDetails.currency,
                    payment_method_types: ['card'],
                    confirmation_method: 'manual',
                    confirm: true,
                    customer: customerId
                });

                
                // Server response
                if (intent && intent.status === 'requires_source_action' && intent.next_action.type === 'use_stripe_sdk') {
                    status = 400;
                    requireAdditionalAction = true;
                    paymentIntentSecret = intent.client_secret
                } else if (intent && intent.status === 'succeeded') {
                    status = 200;
                } else {
                    status = 400;
                    errorMessage = 'Sorry, something went wrong with your card. Please try again.';
                }
                // FOR US, below API supports
                // charge = await stripe.charges.create({
                //     amount: Math.round(reservationDetails.amount * 100),
                //     currency: reservationDetails.currency,
                //     customer: source.customer,
                //     metadata: {
                //         reservationId: reservationDetails.reservationId,
                //         listId: reservationDetails.listId,
                //         title: reservationDetails.title
                //     },
                //     description: 'Reservation: ' + reservationDetails.reservationId
                // });

            } catch (error) {
                status = 400;
                errorMessage = error.message;
            }
        }

        // if (status === 200 && charge && 'id' in charge) {
        if (status === 200 && intent && 'id' in intent) {
            paymentIntentId = intent.id;

            await updateReservation(reservationDetails.reservationId, paymentIntentId);
            await createThread(reservationDetails.reservationId);
            await blockDates(reservationDetails.reservationId);
            await createTransaction(
                reservationDetails.reservationId,
                reservationDetails.guestEmail,
                customerId,
                intent.id,
                Math.round(reservationDetails.amount),
                reservationDetails.currency,
                'booking',
                2
            );
            await emailBroadcast(reservationDetails.reservationId);
        }
        let redirect = '/users/trips/itinerary/' + reservationDetails.reservationId;
        res.send({ status, errorMessage, redirect, paymentIntentSecret });
    });

    app.post('/stripe-reservation-confirm', async function (req, res) {

        const confirmPaymentIntentId = req.body.confirmPaymentIntentId
        const reservationDetails = req.body.reservationDetails;
        let status = 200, errorMessage, customerId, confirmIntent;

        if (reservationDetails) {
            // Check if stripe customer id is already created
            customerId = await getCustomerId(reservationDetails.guestId);
        } else {
            status = 400;
            errorMessage = 'Sorry, something went wrong. Please try again.';
        }

        try {
            confirmIntent = await stripe.paymentIntents.confirm(confirmPaymentIntentId);
        } catch (error) {
            status = 400;
            errorMessage = error.message;
        }

        if (status === 200 && confirmIntent && 'id' in confirmIntent) {
            await updateReservation(reservationDetails.reservationId, confirmPaymentIntentId);
            await createThread(reservationDetails.reservationId);
            await blockDates(reservationDetails.reservationId);
            await createTransaction(
                reservationDetails.reservationId,
                reservationDetails.guestEmail,
                customerId,
                confirmIntent.id,
                Math.round(reservationDetails.amount),
                reservationDetails.currency,
                'booking',
                2
            );
            await emailBroadcast(reservationDetails.reservationId);
        }

        let redirect = '/users/trips/itinerary/' + reservationDetails.reservationId;
        res.send({ status, errorMessage, redirect });
    });

    app.get('/stripe-get-customer', async function (req, res) {
        const customer = await stripe.customers.retrieve('cus_Dn7eqHDkO4Sy3b');
        res.send({ redirect: 'blahblah' });
    });

    app.post('/stripe-create-account', async function (req, res) {
        //const customer = await stripe.customers.retrieve('cus_BWAA082C5iaGXF1');
        var ts = Math.round((new Date()).getTime() / 1000);
        /*const createAccount = await stripe.accounts.create({
            type: 'custom',
            country: 'US',
            email: 'tsroppseeker1@mailinator.com',

            legal_entity: {
                dob: {
                    day: '1',
                    month: '10',
                    year: '1988'
                },
                first_name: 'Sudharsana',
                last_name: 'Rajalingam',
                personal_id_number: '000000000',
                ssn_last_4: '0000',
                type: 'sole_prop',
                address: {
                    city: 'madurai',
                    line1: 'JaihindPuram',
                    postal_code: '625011',
                    state: 'Tamil Nadu'
                }
                
            },
            tos_acceptance: {
                date: ts,
                ip: '192.123.12.12'
            },
            external_account: {
                object: "bank_account",
                country: "US",
                currency: "usd",
                routing_number: "110000000",
                account_number: "000123456789",
            },
        });*/
        const createAccount = await stripe.accounts.create({
            type: "custom",
            country: 'US',
            email: 'tsroppseeker5@mailinator.com',
            external_account: {
                object: "bank_account",
                country: "US",
                currency: "usd",
                routing_number: "110000000",
                account_number: "000123456789",
            },
            /*external_account: {
                object: "card",
                number: "5200828282828210",
                exp_month: 2,
                exp_year: 2019,
                country: "US",
                currency: "usd",
            },*/
            tos_acceptance: {
                date: ts,
                ip: req.connection.remoteAddress
            },
            legal_entity: {
                dob: {
                    day: '1',
                    month: '10',
                    year: '1988'
                },
                first_name: 'Sudharsana',
                last_name: 'Rajalingam',
                ssn_last_4: '0000',
                type: 'sole_prop',
                address: {
                    city: 'madurai',
                    line1: 'JaihindPuram',
                    postal_code: '625011',
                    state: 'Tamil Nadu'
                }

            },
        });
        res.send({ redirect: 'blahblah' });
    });

    app.post('/stripe-create-source', async function (req, res) {
        //const customer = await stripe.customers.retrieve('cus_BWAA082C5iaGXF1');
        const card = await stripe.tokens.create({
            card: {
                "number": '4242424242424242',
                "exp_month": 12,
                "exp_year": 2018,
                "cvc": '123'
            }
        });

        res.send({ redirect: 'blahblah' });
    });
};

export default stripePayment;