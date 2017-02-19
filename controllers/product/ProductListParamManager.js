let ListParamManager = require('../generic/ListParamManager');

class ProductListParamManager extends ListParamManager {
    process(query, default_sort_field) {
        return super.process(query, 'name');
    }
}

module.exports = ProductListParamManager;