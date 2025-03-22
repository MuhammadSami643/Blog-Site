var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

//Router Importing, we can import anything here
const AuthRouter = require("./routes/Auth");
const BlogRouter = require("./routes/blog");

var app = express();
app.use(cors());
// view engine setup
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//connection checking routes, Only test
app.get("/test", (req, res) => {
  res.send("Tested ");
});

//Routes Usage
app.use("/auth", AuthRouter);
app.use("/blog", BlogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Wow! My Code Is Running...?");
});

module.exports = app;
