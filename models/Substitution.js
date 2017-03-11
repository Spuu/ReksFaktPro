let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Document = require('./Document');

var schema = new Schema({
    description: String,
    entries: [{
        position_src: {type: Schema.ObjectId, ref: 'Position', required: true},
        position_dst: {type: Schema.ObjectId, ref: 'Position', required: true}
    }]
});

module.exports = Document.discriminator('Substitution', schema);
