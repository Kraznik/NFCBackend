var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();
const fileUpload = require("express-fileupload");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

var whitelist = [
  "http://localhost:3000",
];

var corsOpts = {};

if (process.env.mode == "testing") {
  corsOpts = {
    origin: "*",

    methods: ["GET", "POST", "PATCH"],

    allowedHeaders: ["Content-Type", "validate"],
  };
} else {
  corsOpts = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
        // callback(null, true);
      }
    },

    methods: ["GET", "POST", "PATCH"],

    allowedHeaders: ["Content-Type", "validate"],
  };
}

const corsOpts2 = {
  origin: "*",

  methods: ["GET", "POST", "PATCH"],

  allowedHeaders: ["Content-Type", "validate"],
};

//model config

var models = require("./models");
models.sequelize
  .sync()
  .then(function () {
    console.log("Connected");
  })
  .catch(function (err) {
    console.log("Oops" + err);
  });

app.use("/", cors(corsOpts2), indexRouter);
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
  res.render("error");
});

module.exports = app;
