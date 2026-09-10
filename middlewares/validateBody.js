const { ValidationError } = require("../errors/AppError");

// Returns a middleware that validates req.body against the given zod schema.
// On success, req.body is replaced with the parsed (and coerced) data.
// On failure, a ValidationError is forwarded to the global error handler.
function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(new ValidationError("invalid request body", result.error.issues));
      return;
    }

    req.body = result.data;
    next();
  };
}

module.exports = validateBody;
