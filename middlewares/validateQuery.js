const { ValidationError } = require("../errors/AppError");

// Returns a middleware that validates req.query against the given zod schema.
// On success, res.locals.query holds the parsed data (req.query itself is read-only in Express 5, so we can't reassign it directly).
// On failure, a ValidationError is forwarded to the global error handler.
function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(new ValidationError("invalid query params", result.error.issues));
      return;
    }

    res.locals.query = result.data;
    next();
  };
}

module.exports = validateQuery;
