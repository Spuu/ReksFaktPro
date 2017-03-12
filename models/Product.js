let mongoose = require('mongoose');
// let mongooseHistory = require('mongoose-history')
let _ = require('lodash');
let Schema = mongoose.Schema;

const STATUS = {
    NEW: 'New',
    UPDATED: 'Updated',
    VALID: 'Valid'
};

let schema = new Schema({
    enabled:                {type: Boolean, default: true},
    ean:                    {type: String, required: true},
    name:                   {type: String, required: true},
    is_barcode:             {type: Boolean, default: false},
    pih_amount:             {type: Number, min: 1, default: 1},
    pih_unit:               {type: String, default: 'g'},
    sell_unit:              {type: String, default: 'szt'},
    vat:                    {type: Number, min: 0, default: 23},
    grouper:                {type: Schema.ObjectId, ref: 'Product'},
    groupee:                [{type: Schema.ObjectId, ref: 'Product'}],
    father:                 {type: Schema.ObjectId, ref: 'Product'},
    children:               [{type: Schema.ObjectId, ref: 'Product'}],

    status:                 {type: String, enum: _.values(STATUS), default: STATUS.NEW},
    cash_register: {
        name: String,
        price: Number,
        vat: Number
    }
});

schema.pre('save', (next) => {
    // check ralation tree consistency
    if (!_.isEmpty(this.children) && !_.isEmpty(this.father)) {
        next(new Error("Product cannot have both father and children."))
    }

    // set default cash register name if doesn't exist
    if (_.isEmpty(this.cash_register)) {
        this.cash_register = {
            name: this.name,
            price: this.sell_brutto_price,
            vat: this.vat};

        this.status = STATUS.NEW;
    }

    // cash register update check
    if (!_.eq(this.cash_register.price, this.sell_brutto_price) || !_.eq(this.cash_register.vat, this.vat)) {
        this.cash_register.price = this.sell_brutto_price;
        this.cash_register.vat = this.vat;

        if(_.isEmpty(this._id)) {
            this.status = STATUS.NEW;
        } else {
            this.status = STATUS.UPDATED;
        }
    }

    next();
});

schema.pre('remove', (next) => {
    let baseCount = this.model('Position').count({'product': this._id});
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
    });

    // TODO: manage grouper/groupee, father/children
});

schema.methods.isEnabled = function () {
    return enabled;
};

schema.methods.isValid = function () {
    return status === 'Valid';
};

schema.statics.STATUS = function () {
    return STATUS;
};

// let options = {diffOnly: true};
// schema.plugin(mongooseHistory, options);

module.exports = mongoose.model('Product', schema);