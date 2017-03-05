let dataModel = require('../../models/Invoice');
let BasicController = require('../generic/BasicController');
let ListParamManager = require('../generic/ListParamManager');
let EmptyQueryBuilder = require('../generic/EmptyQueryBuilder');

class InvoiceController extends BasicController {
    constructor() {
        super(dataModel, new ListParamManager(), new EmptyQueryBuilder());
    }
}

module.exports = new InvoiceController();