// A generic application error that carries an HTTP status code,
// so the global error handler knows what to respond with.
class AppError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

// 404 - a resource (user, author, ...) could not be found.
class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

// 400 - the request body, query params, or path params failed validation.
class ValidationError extends AppError {
  constructor(message, details) {
    super(message, 400, details);
    this.name = "ValidationError";
  }
}

module.exports = { AppError, NotFoundError, ValidationError };
