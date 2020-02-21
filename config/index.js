const logging = require("../logging/logging");

const AWS = {
  awsRegion: "ap-southeast-2"
};
/* logger */
const LOG_LOGGER = new logging.Logger(
  process.env.DEBUG == 'true' ? logging.LEVEL.DEBUG : logging.LEVEL.INFO,
  logging.Formater('hoteliersemail', process.env.LOGGER_FLAG || 'hoteliers-email-api')
)

module.exports = { 
  AWS: AWS,
  logger: LOG_LOGGER,
  SELF_SERVICE_ID: 1,
  PARENT_SERVICE_ID: null
};
