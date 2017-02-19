let Utils = require('../utils/GenericUtils');
let RelationHelper = require('./product/RelationHelper');
let dataModel = require('../models/product');

let BasicController = require('./generic/BasicController.js');
let ProductListParamManager = require('./product/ProductListParamManager');
let ProductQueryBuilder = require('./product/ProductQueryBuilder');

class ProductController extends BasicController {
    constructor() {
        super(dataModel, new ProductListParamManager(), new ProductQueryBuilder());
    }

    ean_name_search(req, res) {
        let limit = req.params.limit || 100;

        this.dataModel.find({
            $or: [{ean: new RegExp(req.params.query, 'i')},
                {name: new RegExp(req.params.query, 'i')}]
        }, function (err, obj) {
            if (err)
                return Utils.error(res, 400, err);

            res.json(obj);
        }).limit(+limit);
    }

    show_children(req, res) {
        let id = req.params.id;
        this.dataModel.findOne({_id: id})
            .populate('_children')
            .exec(function (err, data) {
                if (err) return Utils.err500(res);
                if (!data) return Utils.err404(res);
                return res.json(data);
            });
    }

    /*
     Creates product (marking it as barcode)
     Sets params for add_child route
     */
    create_barcode(req, res, next) {
        req.body.is_barcode = true;
        req.params.return_child = true;

        /* ugly creational copy-paste */
        let model = new this.dataModel();
        Utils.setObject(model, req.body);

        model.save(function (err, data) {
            if (err) return Utils.error(res, 500, err.message);

            req.params.id_c = data._id;
            next();
        });
    }

    /*
     Creates product (marking it as barcode)
     Sets params for add_child route
     */
    find_id_father_from_ean(req, res, next) {

        if (!req.query.ean)
            return Utils.error(res, 500, "No EAN provided.");

        this.dataModel.findOne({ean: req.query.ean}, function (err, data) {
            if (err)
                return Utils.error(res, 500, err.message);

            if (!data)
                return Utils.error(res, 500, "No EAN found.");

            req.params.id_f = data._id;
            next();
        })
    }

    add_child(req, res) {
        let rh = new RelationHelper(req.params.id_f, req.params.id_c);
        rh.addChildObs.subscribe(
            function (data) {
                data.child._father = data.father;
                data.father._children.push(data.child);

                data.child.save(function (err) {
                    if (err)
                        return Utils.error(res, 500, err.message);

                    if (req.params.return_child)
                        return res.json(data.child);

                });

                data.father.save(function (err) {
                    if (err)
                        return Utils.error(res, 500, err.message);

                    if (!req.params.return_child)
                        return res.json(data.father);
                });
            },
            function (err) {
                return Utils.error(res, 500, err.message);
            },
            function () {
                console.log("end of world");
            }
        );
    }

    remove_child(req, res) {
        let rh = new RelationHelper(req.params.id_f, req.params.id_c);
        rh.checkIfBothExist.subscribe(
            function (data) {

                if (!data.father || !data.child)
                    return Utils.error(res, 500, 'No child or father.');

                let child_index = data.father._children.indexOf(data.child._id);

                if (data.child._father === undefined || child_index === -1) {
                    return Utils.error(res, 500, 'No relation between child and father.');
                }

                data.child._father = undefined;
                data.father._children.splice(child_index, 1);

                data.child.save(function (err) {
                    if (err) return Utils.error(res, 500, err.message);
                });

                data.father.save(function (err) {
                    if (err) return Utils.error(res, 500, err.message);

                    return res.json(data.father);
                });
            },
            function (err) {
                return Utils.error(res, 500, err.message);
            }
        );
    }
}

module.exports = new ProductController();