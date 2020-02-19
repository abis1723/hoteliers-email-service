"use strict";
/* jshint node: true */
const { validate } = require("email-validator");
const { logger } = require('../config/index').logger;

function validateEmail(emails) {
  let badEmails = [];
  let filteredEmails = [];
  try {
    const emailListArray = emails.split(',');
    emailListArray.forEach(email => {
      if (!validate(email)) {
        badEmails.push(email);
        throw new Error(`${email} is not a valid email address`);
      }
    });
    if (badEmails && badEmails.length > 0)
      filteredEmails = emailListArray.filter(val => !badEmails.includes(val));

    if (filteredEmails && filteredEmails.length > 0) {
      if (emailListArray.length !== filteredEmails.length) {
        return filteredEmails.join(',');
      }
    }
    else {
      return emails;
    }
  }
  catch (err) {
    logger.error(err);
    return;
  }
}

function validRequest(request) {
  let message = {}
  try {
    if (request && request.to && request.from && request.text) {
      const to = validateEmail(request.to);
      const from = validateEmail(request.from);
      if (request.to)
        message['to'] = to;
      if (request.from)
        message['from'] = from;
      if (request.cc)
        message['cc'] = request.cc;
      if (request.bcc)
        message['bcc'] = request.bcc;
      if (request.subject)
        message['subject'] = request.subject;
      if (request.text)
        message['text'] = request.text;
    }
    else {
      logger.error('Required parameter missing');
    }
    return message;

  } catch (error) {
    logger.error(error);
    return;
  }
}
module.exports = {
  validRequest,
  validateEmail
};