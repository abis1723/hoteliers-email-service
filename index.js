"use strict";
/* jshint node: true */
let { validRequest } = require("./handler/helper");
let { emailHandleSendGrid, emailHandleMailGun } = require('./handler/email-handler')
let { logger } = require('./config/index')

//function to call sendgrid email send service
function emailhandlesendgrid(event, context, callback) {
  var request = JSON.parse(event.body);
  const message = validRequest(request);
  if (message) {
    emailHandleSendGrid(message).then(function (data) {
      const response = {
        "statusCode": 200,
        "body": JSON.stringify(data)
      };
      callback(null, response);
    }, function (err) {
      logger.error(err);
    }).catch(function (err) {
      logger.error(err);
    });
  }
}

//function to call mailgun email send service
function emailhandlemailgun(event, context, callback) {
  var request = JSON.parse(event.body);
  const message = validRequest(request);
  if (message) {
    emailHandleMailGun(message).then(function (data) {
      const response = {
        "statusCode": 200,
        "body": JSON.stringify(data)
      };
      callback(null, response);
    }, function (err) {
      logger.error(err);
    }).catch(function (err) {
      logger.error(err);
    });
  }
}

exports.emailhandlesendgrid = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  emailhandlesendgrid(event, context, callback);
};
exports.emailhandlemailgun = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  emailhandlemailgun(event, context, callback);
};


