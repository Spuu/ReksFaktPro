let Repository = require('./Repository');

class Datasets {
    constructor() {
        this.counterparty = new Repository();
        this.invoice = new Repository();
        this.product = new Repository();
    }
}

module.exports = new Datasets(); // singleton