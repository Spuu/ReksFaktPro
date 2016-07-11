var Utils = require('../../utils/GenericUtils');

module.exports = function(req, res) {

    this.model_info.model().findById(req.params.id, function(err, obj) {
        if (err) {
            return Utils.error(res, 400, err);
        }
        
        res.json(obj);
    });
};