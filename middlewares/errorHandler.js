'use strict';

module.exports = (err, req, res, next) => {
  let failRes = _getFailedResponse(err, req);

  res.status(failRes.code);
  res.json(failRes);

  res.end();
};

function _getFailedResponse(err, req) {
  let error_message = '';
  err.status = err.status ? err.status : 500;
  error_message = err.message ? err.message : 'no error message';

  return {
    code: err.status,
    requestId: req.request_id,
    message: error_message,
    stack: err.stack
  };
}

