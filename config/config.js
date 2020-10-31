
require("dotenv").config();
const mongoose = require('mongoose');

module.exports = {
    'database': process.env.MONGO_DB,

    // connect function to create a mongoDB connection
    'connectDB': function () {
        mongoose.connect(this.database)
    },
}
mongoose.connection.on('open', function () {
    console.log('Connected to Database (MongoDB) ');
})