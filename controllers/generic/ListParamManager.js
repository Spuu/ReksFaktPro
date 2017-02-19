/**
 * Takes request.query and extracts parameters for list
 */
class ListParamManager {
    process(query, default_sort_field) {
        this._offset = query.offset || 0;
        this._limit = query.limit || 100;
        this._query = query.query;
        this._sortField = query.sortField || default_sort_field;
        this._sortOrder = query.sortOrder || 1;
    }

    get sortCriteria() {
        return { [this.sortField()] : this.sortOrder() };
    }

    get offset() {
        return +this._offset;
    }

    get limit() {
        return +this._limit;
    }

    get query() {
        return this._query;
    }

    get sortField() {
        return this._sortField;
    }

    get sortOrder() {
        return +this._sortOrder;
    }
}

module.exports = ListParamManager;