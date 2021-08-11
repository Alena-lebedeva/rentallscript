import fetch from '../../fetch';

export async function sendPaymentToHost(reservationId, hostEmail, payoutId, amount, currency, userId, paymentMethodId) {
    const resp = await fetch('/payout', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reservationId, hostEmail, payoutId, amount, currency, userId, paymentMethodId }),
        credentials: 'include'
    });
    const { status, errorMessage } = await resp.json();
    return { status, errorMessage };
}