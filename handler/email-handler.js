const sgMail = require('@sendgrid/mail');
const Mailgun = require('mailgun-js')
let { logger } = require('../config/index')
let { compileResponse, errorResponse } = require('./response');

//This function is used to send email via sendgrid
function emailHandleSendGrid(message) {
    return new Promise(function (resolve, reject) {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            sgMail.send(message).then(() => {
                const msg = 'Mail sent successfully via sendgrid';
                logger.info(msg);
                resolve(compileResponse(msg));
            }, reject).catch(reject);
        } catch (err) {
            logger.error(err);
            mailGunEmail(message);
            return reject(errorResponse(error));
        }
    });
}

//This function is used to send email via mailGun
function emailHandleMailGun(message) {
    return new Promise(function (resolve, reject) {
        try {
            const mailgun = new Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
            const data = {
                from: message.from,
                to: message.to,
                // cc: cc, //with the sandbox subdomain, we cannot send email to multiple recipients
                // bcc: bcc,
                subject: message.subject,
                text: message.text
            };
            mailgun.messages().send(data, (error) => {
                if (error)
                    return reject(error);
                else {
                    const msg = 'Mail sent successfully via mailgun';
                    logger.info(msg);
                    resolve(compileResponse(msg));
                }
            });
        } catch (error) {
            logger.error(error);
            sendGridEmail(message);
            return reject(errorResponse(error));
        }
    });
}

module.exports = {
    emailHandleSendGrid: emailHandleSendGrid,
    emailHandleMailGun: emailHandleMailGun
}
