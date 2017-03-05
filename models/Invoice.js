let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Document = require('./Document');

let schema = new Schema({
    cpty:      {type: Schema.ObjectId, ref: 'Cpty', required: true},
    store:     {type: Schema.ObjectId, ref: 'Store', required: true},
    type:       {type: String, enum: ['Buy', 'Sell', 'Bill'], default: 'Buy'},
    positions:  [{type: Schema.ObjectId, ref: 'Position'}]
});

module.exports = Document.discriminator('Invoice', schema);