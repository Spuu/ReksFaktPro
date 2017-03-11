let dataModel = require('../../models/List');
let BasicController = require('../generic/BasicController');
let ListParamManager = require('../generic/ListParamManager');
let EmptyQueryBuilder = require('../generic/EmptyQueryBuilder');

class ListController extends BasicController {
    constructor() {
        super(dataModel, new ListParamManager(), new EmptyQueryBuilder());
    }
}

module.exports = new ListController();