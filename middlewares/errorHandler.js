const fs = require("node:fs");
const path = require("node:path");

const ERROR_LOG_PATH = path.join(__dirname, "..", "data", "error.log");

// Appends a single JSON line describing the error to the log file.
function logErrorToFile(error, req) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    statusCode: error.statusCode || 500,
    message: error.message,
    ...(error.details ? { details: error.details } : {}),
  };

  fs.appendFile(ERROR_LOG_PATH, JSON.stringify(logEntry) + "\n", (err) => {
    if (err) {
      // when the log write itself fail - fall back to the console so the error isn't lost.
      console.error("failed to write to error log:", err);
    }
  });
}

// Express recognizes this as an error-handling middleware, takes four arguments. It must be registered last after all routes.
function errorHandler(error, req, res, next) {
  logErrorToFile(error, req);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "internal server error";

  res.status(statusCode).json({
    error: message,
    ...(error.details ? { details: error.details } : {}),
  });
}

module.exports = errorHandler;
