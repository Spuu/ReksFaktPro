let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Document = require('./Document');

let schema = new Schema({
    store:          {type: Schema.ObjectId, ref: 'Store', required: true},
    counterparty:   {type: Schema.ObjectId, ref: 'Counterparty', required: true},
    positions:      [{type: Schema.ObjectId, ref: 'Position'}],
    type:           {type: String, enum: ['Buy', 'Sell', 'Bill'], default: 'Buy'}
});

module.exports = Document.discriminator('Invoice', schema);