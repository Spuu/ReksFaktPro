let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let schema = new Schema({
    name        : { type: String, required: true, unique: true, dropDups: true },
    type        : String
});

module.exports = mongoose.model('Category', schema);