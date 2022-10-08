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


//testing

const fs = require("fs")
const Jimp = require('jimp');
var QRCode = require('qrcode')

async function test(){
  var bg = await Jimp.read(`./public/bg.png`);
  var image1 = await Jimp.read(`https://gateway.pinata.cloud/ipfs/QmavYWUp68dv5gqjrb5ueSp4BHgdsVHFKkZuDkyEMrQa7s`);
  image1.resize(Jimp.AUTO,600);
  bg.composite(image1,bg.bitmap.width/2-image1.bitmap.width/2,350);

  const font = await Jimp.loadFont("./public/MXfnces00eitd2ZIbD_O_9LL.ttf.fnt");
  const font1 = await Jimp.loadFont("./public/UVlI7_gD6w7WBBK8_LmJG0FJ.ttf.fnt");
  const font2 = await Jimp.loadFont("./public/kEO276MrJpMd0SxlVrCeui7f.ttf.fnt");

  var textWidth = Jimp.measureText(font, "Manu Alzuru");

  bg.print(font, bg.bitmap.width/2-textWidth/2, 150,{
    text: "Manu Alzuru"
  });

  bg.print(font1, 370, 1015,{
    text: "333"
  });

  bg.print(font2, 120, 1097,{
    text: "@Manu_Alzuru"
  });

  bg.print(font2, 120, 1172,{
    text: "@Manu_Alzuru"
  });

  var buffer1 = await QRCode.toDataURL('https://doingud.com');

  var buffer = new Buffer(buffer1.replace(/^data:image\/\w+;base64,/, ""),'base64');
  console.log(buffer);

  var image2 = await Jimp.read(buffer);
  image2.resize(220,220)

  bg.composite(image2,577,1015)

  bg.write("./public/test.png");
}

module.exports = app;
