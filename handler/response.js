/**
 * compileResponse
 *
 * Compile status code and object body into a response
 * that lambda expects
 */
function compileResponse(message) {
  const body = typeof message === 'string' ? message : JSON.stringify(message);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body,
  };
}

function HTTPErrorResponse({ status, error }) {
  const statusCode = status || 404;
  const resp = {
    statusCode,
    body: JSON.stringify({ error }),
  };
  return resp;
}

function errorResponse(message) {
  return HTTPErrorResponse({
    status: 404,
    error: message,
  });
}

module.exports = {
  compileResponse,
  errorResponse
};
