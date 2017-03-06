let mongoose = require('mongoose');
let _ = require('lodash');
let Schema = mongoose.Schema;

let schema = new Schema({
    product: {type: Schema.ObjectId, ref: 'Product', required: true},
    store: {type: Schema.ObjectId, ref: 'Store', required: true},
    entries: [{
        position: {type: Schema.ObjectId, ref: 'Position', required: true},
        initial_amount: Number,
        current_amount: Number,
        delta: Number,
        amount: Number
    }]
});

schema.methods.getAmount = function () {
    let lastEntry =  _.last(entries);

    if (!_.isUndefined(lastEntry)) {
        return lastEntry.amount;
    }

    return 0;
};

module.exports = mongoose.model('Archive', schema);