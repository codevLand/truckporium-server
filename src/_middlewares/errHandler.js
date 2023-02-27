const logger = require('./../_helpers/winston')

module.exports = { errorHandler, validateReq }

// base error handler
function errorHandler(err, req, res, next) {
  if(res.headersSent) return // next(err, req, res, next);
  if (typeof err === 'string') {
    const is404 = err.toLowerCase().endsWith('not found')
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err })
  }
  logger.error({ code: 500, error: err })
  return res.status(500).json({ message: err.message })
}


// API validation error handler
function validateReq(req, next, schema) {
  const options = {
    abortEarly: false,    // include all errors
    allowUnknown: true,   // ignore unknown props
    stripUnknown: true,   // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) { 
    throw 'Validation error: ' + error.details
      .map(x => x.message)
      .join(', ')
      //.toString().replace(/\\"/g, '').replace(/"/g, '')
  }
  req.body = value;
  next();
}