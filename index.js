"use strict";
/* jshint node: true */
let { validRequest } = require("./handler/helper");
let { emailHandleSendGrid, emailHandleMailGun } = require('./handler/email-handler')
let { logger } = require('./config/index')

//function to call sendgrid email send service
function emailhandlesendgrid(event) {
  const request = JSON.parse(event.body);
  const message = validRequest(request);
  if (message) {
    emailHandleSendGrid(message).then((data) => {
      logger.info(data);
    }).catch((data) => {
      logger.error(data);
    });
  }
}

//function to call mailgun email send service
function emailhandlemailgun(event) {
  const request = JSON.parse(event.body);
  const message = validRequest(request);
  if (message) {
    emailHandleMailGun(message).then((data) => {
      logger.info(data);
    }).catch((data) => {
      logger.error(data);
    });
  }
}

exports.emailhandlesendgrid = function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  emailhandlesendgrid(event);
};
exports.emailhandlemailgun = function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  emailhandlemailgun(event);
};


