var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var schema = new Schema({
    name        : { type: String, required: true, unique: true, dropDups: true },
    type        : String
});

module.exports = mongoose.model('Category', schema);