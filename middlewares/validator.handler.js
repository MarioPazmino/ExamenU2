//middleware/validator.handler.js
const boom = require('boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
      return next(boom.badRequest(error));
    }
    req[property] = value; // Add this line
    next();
  };
}

module.exports = validatorHandler;
