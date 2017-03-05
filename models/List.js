let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Document = require('./Document');

let schema = new Schema({
    store:          {type: Schema.ObjectId, ref: 'Store', required: true},
    entries: [{
        ean:        {type: String, required: true},
        product:    {type: Schema.ObjectId, ref: 'Product'},
        quantity:   {type: Number, default: 0}
    }]
});

module.exports = Document.discriminator('List', schema);