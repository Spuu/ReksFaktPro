var Utils = require('../utils/GenericUtils');
var dataModel = require('../models/List');

module.exports = {

    list: function (req, res) {

        let offset = req.query.offset || 0;
        let limit = req.query.limit || 100;
        let query = req.query.query;
        let sort = req.query.sort || 'name';
        let order = req.query.order || 1;

        let queryMongo = {};

        if (query) {
            queryMongo = {
                $or: [
                    {ean: new RegExp(query, 'i')},
                    {name: new RegExp(query, 'i')}
                ]
            }
        }

        let sortObj = { [sort] : +order };

        let promises = [
            dataModel.count(queryMongo).exec(), // total rows
            dataModel.find(queryMongo)          // paged docs
                .sort(sortObj)
                .skip(+offset)
                .limit(+limit)
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
    },

    show: function(req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function(err, data){
            if(err) return Utils.err500(res);

            if(!data) return Utils.err400(res);
            return res.json(data);
        });
    },

    create: function(req, res) {
        var model = new dataModel();
        Utils.setObject(model, req.body);

        model.save(function(err, data){
            if(err) return Utils.error(res, 500, err.message);
            return res.json(data);
        });
    },

    update: function(req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function(err, data){
            if(err) return Utils.error(res, 500, err.message);
            if(!data) return Utils.err400(res);

            Utils.setObject(data, req.body);

            data.save(function(err, data){
                if(err) return Utils.err500(res);
                if(!data) return Utils.err404(res);
                return res.json(data);
            });
        });
    },

    remove: function(req, res) {
        var id = req.params.id;
        dataModel.findByIdAndRemove(id, function(err, data){
            if(err) return Utils.err500(res);
            return res.json(data);
        });
    }
};