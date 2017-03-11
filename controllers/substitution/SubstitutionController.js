let dataModel = require('../../models/Substitution');
let BasicController = require('../generic/BasicController');
let ListParamManager = require('../generic/ListParamManager');
let EmptyQueryBuilder = require('../generic/EmptyQueryBuilder');

class SubstitutionController extends BasicController {
    constructor() {
        super(dataModel, new ListParamManager(), new EmptyQueryBuilder());
    }
}

module.exports = new SubstitutionController();