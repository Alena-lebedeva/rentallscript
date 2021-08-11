'use strict';
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import { emailConfig } from '../../config';
import { getUserEmail } from './helpers/getUserEmail';

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.email,
        pass: emailConfig.password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: emailConfig.tls
    }
}));

const sendEmail = (app) => {

    app.post('/sendEmail', async function(req, res, next) {
        let mailOptions = req.body.mailOptions;
        let from = emailConfig.sender + '<' + emailConfig.senderEmail + '>';

        if (mailOptions && mailOptions.to && mailOptions.to.indexOf('@') < 0) {
            mailOptions['to'] = await getUserEmail(mailOptions.to);
        }

        mailOptions['from'] = from; // Sender email(Platform/Admin)
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send({ status: 400, response: error });
            }
            return res.send({ status: 200, response: 'email send successfully' });
        });
    });

};

export default sendEmail;  