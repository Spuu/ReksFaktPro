let mongoose = require('mongoose');
let config = require('./config');

mongoose.Promise = global.Promise;

let mongourl = process.env.MONGODB_URI || config.mongo_url;
module.exports = mongoose.connect(mongourl);
