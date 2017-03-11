let Utils = require('../../utils/GenericUtils');
let dataModel = require('../../models/Category');
let BasicController = require('../generic/BasicController');
let ListParamManager = require('../generic/ListParamManager');
let EmptyQueryBuilder = require('../generic/EmptyQueryBuilder');


class PositionController extends BasicController {
    constructor() {
        super(dataModel, new ListParamManager(), new EmptyQueryBuilder());
    }

    search(req, res, next) {
        let product_id = req.params.product_id;
        let store_id = req.params.store_id;

        let query = {_product: product_id};

        if (store_id)
            query._store = store_id;

        dataModel.find(query)
            .populate('_invoice')
            .exec(function (err, position) {
                if (err) return Utils.error(res, 500, err.message);

                if (position.length > 0 || !store_id) {
                    req.mydata = _.last(
                        _.orderBy(
                            position, function (el) {
                                return el._invoice.document_date;
                            }
                        )
                    );
                    next();
                } else {
                    dataModel.find({_product: product_id})
                        .populate('_invoice')
                        .exec(function (err, position) {
                            if (err) return Utils.error(res, 500, err.message);

                            if (position.length > 0) {
                                req.mydata = _.last(
                                    _.orderBy(
                                        position, function (el) {
                                            return el._invoice.document_date;
                                        }
                                    )
                                );
                                next();
                            }
                            else {
                                req.mydata = {};
                                next();
                            }
                        });
                }
            });
    }

    invoice(req, res, next) {
        let invoice_id = req.params.invoice_id;

        dataModel.find({_invoice: invoice_id})
            .exec(function (err, positions) {
                if (err) return Utils.error(res, 500, err.message);
                req.mydata = positions;
                next();
            });
    }
}

module.exports = new PositionController();