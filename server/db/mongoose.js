var mongoose = require('mongoose');
// var secrets = require('../config/secrets');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:UplinkDownlink@cluster0-uyrnj.mongodb.net/testingGround?retryWrites=true', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongo Online");
});

module.exports = {mongoose};
