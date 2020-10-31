require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require('./routes/api')
const app = express();
const config = require("./config/config");

app.use(cors());

config.connectDB();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

app.use(express.static(path.join(__dirname, "build")));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});




// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})


module.exports = app;
