import React from 'react';
import Oy from 'oy-vey';
import { IntlProvider } from 'react-intl';
import fetch from '../fetch';
import EmailTemplate from './template/EmailTemplate';
import { getSubject } from './template/subjects';

export async function sendEmail(to, type, content) {
    
    let html, subject, previewText;
    let subjectData = getSubject(type), emailContent = content;

    let query = `query getEmailLogo {
        getEmailLogo { 
          name
          value
        }
      }`;

    if (content && !content.logo) {
        const logoResp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query
            }),
            credentials: 'include',
        });

        const { data } = await logoResp.json();
        emailContent.logo = data && data.getEmailLogo && data.getEmailLogo.value;
    }

    html = Oy.renderTemplate(
        <IntlProvider locale={"en"}>
            <EmailTemplate type={type} content={emailContent} />
        </IntlProvider>, {
            title: subjectData.subject,
            previewText: subjectData.previewText
        });

    let mailOptions = {
        to, // list of receivers
        subject: subjectData.subject, // Subject line
        //text: textMessage, // plain text body
        html
    };
    const resp = await fetch('/sendEmail', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mailOptions }),
        credentials: 'include'
    });
    const { status, response } = await resp.json();
    return { status, response };
} 
