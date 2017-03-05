let mongoose = require('mongoose');
let _ = require('lodash');
let Schema = mongoose.Schema;

let schema = new Schema({
    index:      {type: Number, min: 1, default: 1},
    document:   {type: Schema.ObjectId, ref: 'Document', required: true},
    store:      {type: Schema.ObjectId, ref: 'Store', required: true},
    base: {
        product:            {type: Schema.ObjectId, ref: 'Product', required: true},
        buy_netto_price:    {type: Number, min: 0, default: 0},
        sell_brutto_price:  {type: Number, min: 0, default: 0},
        quantity:           {type: Number, min: 0, default: 1},
        discount:           {type: Number, min: 0, default: 0},
        retail_rate:        {type: Number, min: 0, default: 1}
    },
    sell: {
        product:            {type: Schema.ObjectId, ref: 'Product'},
        buy_netto_price:    {type: Number, min: 0, default: 0},
        sell_brutto_price:  {type: Number, min: 0, default: 0},
        unit_nominator:     {type: Number, min: 0, default: 1},
        unit_denominator:   {type: Number, min: 0, default: 1}
    }
});

schema.pre('save', function (next) {
    // set default if doesn't exist
    if (_.isEmpty(this.sell.product)) {
        this.sell.product = this.base.product;
        this.sell.buy_netto_price = this.base.buy_netto_price;
        this.sell.sell_brutto_price = this.base.sell_brutto_price;
    }

    next();
});

module.exports = mongoose.model('Position', schema);
