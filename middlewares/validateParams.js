const { ValidationError } = require("../errors/AppError");

// Returns a middleware that validates req.params against the given zod schema.
// On success, req.params is updated in place with the parsed data.
// On failure, a ValidationError is forwarded to the global error handler.
function validateParams(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      next(new ValidationError("invalid path params", result.error.issues));
      return;
    }

    Object.assign(req.params, result.data);
    next();
  };
}

module.exports = validateParams;
