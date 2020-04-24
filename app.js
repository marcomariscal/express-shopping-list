const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const routes = require("./routes/itemRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", routes);

/** general error handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
