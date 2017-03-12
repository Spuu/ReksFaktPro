var Utils = require('../../utils/GenericUtils');

/**
 * General routes for all models
 */
class BasicController {

    constructor(dataModel, paramManager, queryBuilder) {
        this.dataModel = dataModel;
        this.paramManager = paramManager;
        this.queryBuilder = queryBuilder;
    }

    list(req, res) {
        this.paramManager.process(req.query);

        let query = this.queryBuilder.build(
            this.paramManager.query
        );

        let promises = [
            this.dataModel
                .count(query)
                .exec(), // total rows

            this.dataModel
                .find(query)          // paged docs
                .sort(this.paramManager.sortCriteria)
                .skip(this.paramManager.offset)
                .limit(this.paramManager.limit)
                .exec()
        ];

        Promise.all(promises)
            .then((data) => {
                return res.json({
                    total: data[0],
                    docs: data[1]
                });
            })
            .catch((err) => {
                return Utils.err500(res)
            });
    }

    show(req, res) {
        let id = req.params.id;
        this.dataModel
            .findOne({_id: id}, (err, data) => {
                if (err) return Utils.err500(res);

                if (!data) return Utils.err400(res);
                return res.json(data);
            });
    }

    create(req, res) {
        let model = new this.dataModel();
        Object.assign(model, req.body);

        model.save((err, data) => {
            if (err) return Utils.error(res, 500, err.message);
            return res.json(data);
        });
    }

    update(req, res) {
        let id = req.params.id;
        this.dataModel.findOne({_id: id}, (err, data) => {
            if (err) return Utils.error(res, 500, err.message);
            if (!data) return Utils.err400(res);

            Object.assign(data, req.body);

            data.save((err, data) => {
                if (err) return Utils.err500(res);
                if (!data) return Utils.err404(res);
                return res.json(data);
            });
        });
    }

    remove(req, res) {
        let id = req.params.id;
        this.dataModel.findByIdAndRemove(id, (err, data) => {
            if (err) return Utils.err500(res);
            return res.json(data);
        });
    }
}

module.exports = BasicController;