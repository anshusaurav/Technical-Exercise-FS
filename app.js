require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require('./routes/api')
const app = express();
// const config = require("./config/config");
const mongoose = require('mongoose');
app.use(cors());

// config.connectDB();
const uri = "mongodb+srv://anshusaurav:abcd1234@cluster0.eawse.mongodb.net/filespin-assessment?retryWrites=true&w=majority";
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
app.use(bodyParser.json());
app.use(express.json());
// app.use(express.static('build'));

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
