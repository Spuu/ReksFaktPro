let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Document = require('./Document');

let schema = new Schema({
    _cpty:  {type: Schema.ObjectId, ref: 'Cpty', required: true},
    _store: {type: Schema.ObjectId, ref: 'Store', required: true},
    type:   {type: String, enum: ['Buy', 'Sell', 'Bill'], default: 'Buy'}
});

module.exports = Document.discriminator('Invoice', schema);