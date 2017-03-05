let dataModel = require('../../models/Category');
let BasicController = require('../generic/BasicController');
let ListParamManager = require('../generic/ListParamManager');
let EmptyQueryBuilder = require('../generic/EmptyQueryBuilder');

class CategoryController extends BasicController {
    constructor() {
        super(dataModel, new ListParamManager(), new EmptyQueryBuilder());
    }
}

module.exports = new CategoryController();