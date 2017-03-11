let dataModel = require('../../models/Store');
let BasicController = require('../generic/BasicController');
let EmptyQueryBuilder = require('../generic/EmptyQueryBuilder');
let ProductListParamManager = require('../product/ProductListParamManager');

class StoreController extends BasicController {
    constructor() {
        super(dataModel, new ProductListParamManager(), new EmptyQueryBuilder());
    }
}

module.exports = new StoreController();