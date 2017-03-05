let mongoose = require('mongoose');
let mongooseHistory = require('mongoose-history');
let _ = require('lodash');
let Schema = mongoose.Schema;

let schema = new Schema({
    ean:                    {type: String, required: true},
    name:                   {type: String, required: true},
    cash_register_name:     String, // set in 'pre' function
    cash_register_rate:     {type: Number, min: 0, default: 1},
    is_barcode:             {type: Boolean, default: false},
    pih_amount:             {type: Number, min: 1, default: 1},
    pih_unit:               {type: String, default: 'g'},
    sell_unit:              {type: String, default: 'szt'},
    vat:                    {type: Number, min: 0, default: 23},
    status:                 {type: String, enum: ['New', 'Updated', 'Valid'], default: 'New'},
    grouper:                {type: Schema.ObjectId, ref: 'Product'},
    groupee:                [{type: Schema.ObjectId, ref: 'Product'}],
    father:                 {type: Schema.ObjectId, ref: 'Product'},
    children:               [{type: Schema.ObjectId, ref: 'Product'}] // is set automatically in middleware
});

schema.pre('save', (next) => {
    // set default if doesn't exist
    if (_.isEmpty(this.cash_register_name)) {
        this.cash_register_name = this.name;
    }

    // check if ralation tree consistency
    if (!_.isEmpty(this.children) && !_.isEmpty(this.father)) {
        next(new Error("Product cannot have both father and children."))
    } else {
        // update
        this.model('Product').find({'father': this._id}, '_id', (error, results) => {
            if (error)
                next(error);

            this.children = results;
            next();
        });
    }
});

schema.pre('remove', (next) => {
    let baseCount = this.model('Position').count({'base.product': this._id});
    let sellCount = this.model('Position').count({'sell.product': this._id});

    let exec = (element, callback) => {
        element.exec((error, count) => {
            callback(error, count);
        })
    };

    async.map([baseCount, sellCount], exec, (error, counts) => {
        if (!error && _.sum(counts) != 0)
            error = new Error("There are existing position of that product. Cannot remove.");

        next(error);
    })
});


schema.methods.isValid = function () {
    return status === 'Valid';
};

schema.statics.STATUS = function () {
    return {
        NEW: 'New',
        UPDATED: 'Updated',
        VALID: 'Valid'
    }
};

let options = {diffOnly: true};
schema.plugin(mongooseHistory, options);

module.exports = mongoose.model('Product', schema);