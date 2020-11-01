require("dotenv").config();
const express = require("express");
const path = require("path");
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require('./routes/api')
const app = express();
const mongoose = require('mongoose');
app.use(cors());

// config.connectDB();
const uri = process.env.MONGO_DB;
mongoose.connect(uri, {
  useNewUrlParser: true
}, function (err, db) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Connected to database');
    mongoose.set('debug', true);
  }
})
app.use(express.static("client/build"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
