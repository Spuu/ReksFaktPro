let _ = require('lodash');

class Repository {
    constructor() {
        this.container = {};
    }

    set(key, value) {
        this.container[key] = value;
    }

    get(key) {
        return this.container[key];
    }

    show() {
        console.log(this.container);
    }

    findKey(value) {
        return _.findKey(this.container, (v) => v === value);
    }

    getKeys() {
        return _.keys(this.container);
    }
}

module.exports = Repository;