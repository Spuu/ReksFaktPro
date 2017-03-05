let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    creation_date:      {type: Date, default: Date.now},
    document_date:      {type: Date, default: Date.now},
    last_modif_date:    {type: Date, default: Date.now},
    name:               {type: String, required: true},
    categories:         [{type: Schema.ObjectId, ref: 'Category'}]
});

module.exports = mongoose.model('Document', schema);