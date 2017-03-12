let Repository = require('./Repository');

class Identifiers {
    constructor() {
        this.category = new Repository();
        this.counterparty = new Repository();
        this.store = new Repository();
        this.invoice = new Repository();
    }
}

module.exports = new Identifiers(); // singleton