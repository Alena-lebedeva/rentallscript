import fetch from '../../fetch';

export async function processStripePayment(type, cardDetails, reservationDetails, paymentMethodId, confirmPaymentIntentId) {

    let URL;
    let variables = {
        cardDetails,
        reservationDetails,
        paymentMethodId
    };
    if (type === 'reservation') {
        URL = '/stripe-reservation';
    } else if (type === 'remainingPayment') {
        URL = '/remaining-payment';
    } else if (type === 'refund') {
        URL = '/stripe-refund';
    } else if (type === 'payout') {
        URL = '/stripe-payout';
    } else if (type === 'addPayout') {
        URL = '/stripe-add-payout';
        variables = {
            userDetails: cardDetails,
            bankDetails: reservationDetails
        };
    } else if (type === 'verifyPayout') {
        URL = '/stripe-verify-payout';
        variables = {
            userDetails: cardDetails
        };
    } else if (type === 'getCustomer') {
        URL = '/stripe-get-customer';
    } else if (type === 'account') {
        URL = '/stripe-create-account';
    } else if (type === 'source') {
        URL = '/stripe-create-source';
    } else if (type === 'confirmReservation') {
        URL = '/stripe-reservation-confirm';
        variables = {
            confirmPaymentIntentId,
            reservationDetails
        }
    }

    const resp = await fetch(URL, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(variables),
        credentials: 'include'
    });
    //return await resp.json();
    const { status, errorMessage, redirect, accountId, paymentIntentSecret } = await resp.json();
    if (status === 200 && redirect) {
        window.location = redirect;
    }
    return {
        status,
        errorMessage,
        accountId,
        paymentIntentSecret
    }
}