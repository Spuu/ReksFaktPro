var mongoose     = require('mongoose');
var mongooseHistory = require('mongoose-history');
var Schema       = mongoose.Schema;

var ProductSchema = new Schema({
    _father                 : { type: Schema.ObjectId, ref: 'Product' },
    _children               : [{ type: Schema.ObjectId, ref: 'Product' }],
    is_barcode              : { type: Boolean, default: false },
    ean                     : { type: String, required: true },
    name                    : { type: String, required: true },
    cash_register_name      : String, // set in 'pre' function
    display_name            : String, // set in 'pre' function
    cash_register_rate      : { type: Number, default: 1 },
    pih_amount              : { type: Number, default: 0 },
    pih_unit                : { type: String, default: 'kg' },
    sell_unit               : { type: String, default: 'szt' },
    unit_nominator          : {type: Number, default: 1},
    unit_denominator        : {type: Number, default: 1},
    status                  : { type: String, enum: ['New', 'Updated', 'Ok'], default: 'New' },
    vat                     : {type: Number, default: 0}
});

ProductSchema.pre('save', function(next) {
    // set default if doesn't exist
    if(typeof this.cash_register_name === 'undefined' || !this.cash_register_name)
        this.cash_register_name = this.name;

    this.display_name = `${this.ean} ${this.name}`;
    next();
});

ProductSchema.methods.isOk = function() {
    return status === 'Ok';
};

ProductSchema.statics.statusVal = function () {
    return {
        new: 'New',
        updated: 'Updated',
        ok: 'Ok'
    }
};

var options = {diffOnly: true};
ProductSchema.plugin(mongooseHistory, options);

module.exports = mongoose.model('Product', ProductSchema);