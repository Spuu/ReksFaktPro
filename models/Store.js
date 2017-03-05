let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    name: {type: String, required: true, unique: true, dropDups: true},
    long_name: String
});

module.exports = mongoose.model('Store', schema);