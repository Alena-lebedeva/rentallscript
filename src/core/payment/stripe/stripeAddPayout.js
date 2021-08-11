import stripePackage from 'stripe';
import { payment, url } from '../../../config';
const stripe = stripePackage(payment.stripe.secretKey, {
    apiVersion: '2019-12-03'
});

const stripeAddPayout = app => {
    app.post('/stripe-add-payout', async function (req, res) {

        const userDetails = req.body.userDetails;
        const bankDetails = req.body.bankDetails;
        let status = 200, errorMessage, createPayout;
        let accountId = null;
        var ts = Math.round((new Date()).getTime() / 1000);
        let redirect = null, isVerified = false;
        let business_type = null, stripeAccountId = null;
        let requested_capabilities = ['card_payments', 'transfers'];

        if (!userDetails && !bankDetails) {
            status = 400;
            errorMessage = 'Something went wrong, reload the page and try again';
        }

        if (status === 200) {
            try {
                business_type = bankDetails && bankDetails.businessType ? bankDetails.businessType : 'individual';
                if (business_type === 'individual') {
                    createPayout = await stripe.accounts.create({
                        type: "custom",
                        business_type, // individual
                        individual: {
                            email: userDetails.email,   
                            first_name: bankDetails.firstname,
                            last_name: bankDetails.lastname, 
                            address: {
                                line1: bankDetails.address1,
                                city: bankDetails.city,
                                state: bankDetails.state,
                                country: bankDetails.country,
                                postal_code: bankDetails.zipcode
                            },
                            ssn_last_4: bankDetails.ssn4Digits
                        },
                        country: bankDetails.country,
                        email: userDetails.email,
                        requested_capabilities,
                        external_account: {
                            object: "bank_account",
                            country: bankDetails.country,
                            currency: bankDetails.currency,
                            routing_number: bankDetails.routingNumber,
                            account_number: bankDetails.accountNumber,
                        }
                    });

                    stripeAccountId = createPayout.id;
                } else if (business_type === 'company') {
                    createPayout = await stripe.accounts.create({
                        type: "custom",
                        business_type, // company
                        company: {
                            name: bankDetails.firstname,
                            address: {
                                line1: bankDetails.address1,
                                city: bankDetails.city,
                                state: bankDetails.state,
                                country: bankDetails.country,
                                postal_code: bankDetails.zipcode
                            }
                        },
                        country: bankDetails.country,
                        email: userDetails.email,
                        requested_capabilities,
                        external_account: {
                            object: "bank_account",
                            country: bankDetails.country,
                            currency: bankDetails.currency,
                            routing_number: bankDetails.routingNumber,
                            account_number: bankDetails.accountNumber,
                        }
                    });

                    stripeAccountId = createPayout.id;

                    // Because this is a business (and not an individual), we'll need to specify
                    // the account opener by email address using the Persons API.
                    const accountOpener = await stripe.account.createPerson(stripeAccountId, {
                        email: userDetails.email,
                        relationship: {
                            representative: true
                        }
                    });
                }

                
                const accountLinks = await stripe.accountLinks.create({
                    account: stripeAccountId,
                    failure_url: url + '/user/payout/failure?account='  + stripeAccountId,
                    success_url: url + '/user/payout?account='  + stripeAccountId,
                    type: 'custom_account_verification',
                    collect: 'currently_due', // currently_due or eventually_due
                });

                redirect = accountLinks.url; // Account links API on-boarding URL
            } catch (error) {
                status = 400;
                errorMessage = error.message;
            }
        }

        if (status === 200 && stripeAccountId) {
            accountId = stripeAccountId;
        } else {
            status = 400;
            errorMessage = errorMessage ? errorMessage : 'Something went wrong, please try again!';
        }

        res.send({ status, errorMessage, redirect, accountId, isVerified });
    });

    app.post('/stripe-verify-payout', async function (req, res) {
        const userDetails = req.body.userDetails;
        let account = userDetails && userDetails.currentAccountId;
        let status = 200, errorMessage, redirect;

        try {
            const accountVerifyPendingVerifications = await stripe.accountLinks.create({
                account,
                failure_url: url + '/user/payout/failure?account='  + account,
                success_url: url + '/user/payout?account='  + account,
                type: 'custom_account_verification',
                collect: 'currently_due', // currently_due or eventually_due
            });

            redirect = accountVerifyPendingVerifications && accountVerifyPendingVerifications.url;
        } catch (error) {
            status = 400;
            errorMessage = error.message;
        }
        
        res.send({
            status,
            errorMessage,
            redirect
        });
    });
};

export default stripeAddPayout;