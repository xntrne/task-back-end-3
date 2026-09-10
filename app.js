//routing routers file
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authorRoutes = require("./routes/authorRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { NotFoundError } = require("./errors/AppError");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/authors", authorRoutes);

// Any request that didn't match a route above.
app.use((req, res, next) => {
  next(new NotFoundError("route not found"));
});

// Must be registered last: Express recognizes it as the error handler because it takes four arguments.
app.use(errorHandler);

module.exports = app;
