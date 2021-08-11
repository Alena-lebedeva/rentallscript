import React from 'react';
import Oy from 'oy-vey';

import { emailConfig } from '../../config';

import EmailTemplate from './template/EmailTemplate';
import { getSubject } from './template/subjects';

// Helpers
import { getSiteLogo } from './helpers/getSiteLogo';
import { getUserEmail } from './helpers/getUserEmail';

// SMTP libraries & configurations
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

export async function sendServerEmail(to, type, content) {
    let html, subject, previewText, emailStatus = 200, emailErrorMessage = null;

    try {
        let subjectData = getSubject(type);
        let from = emailConfig.sender + '<' + emailConfig.senderEmail + '>';

        let emailContent = content;
        emailContent['logo'] = await getSiteLogo();

        html = Oy.renderTemplate(<EmailTemplate type={type} content={emailContent} />, {
            title: subjectData && subjectData.subject,
            previewText: subjectData && subjectData.previewText
        });

        let mailOptions = {
            from, // Sender
            to, // list of receivers
            subject: subjectData && subjectData.subject, // Subject line
            html
        };

        if (to && to.indexOf('@') < 0) { // If sends userID of the receiver
            mailOptions['to'] = await getUserEmail(to);
        }

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

        let sendSMTPEmail = await transporter.sendMail(mailOptions);

        if (sendSMTPEmail && !sendSMTPEmail.messageId) {
            emailStatus = 400;
            emailErrorMessage = 'Oops! Something went wrong. Unable to send the email.'
        }
    } catch (error) {
        emailStatus = 400;
        emailErrorMessage = 'Oops! Something went wrong. ' + error
    }

    return await { emailStatus, emailErrorMessage };
} 
