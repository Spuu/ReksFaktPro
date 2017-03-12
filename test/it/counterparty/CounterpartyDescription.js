const COUNTERPARTY = 'counterparty_';

class CounterpartyDescription {
    static get keyArti() {
        return COUNTERPARTY + this.datasets[0].name;
    }

    static get keyZooleszcz() {
        return COUNTERPARTY + this.datasets[1].name;
    }

    static get keyEurozoo() {
        return COUNTERPARTY + this.datasets[2].name;
    }

    static get datasets() {
        return [{
            name: 'Arti',
            long_name: 'Fajna Arti firma' // updated
        }, {
            name: 'Zooleszcz',
            long_name: 'Zooleszczu'
        }, {
            name: 'Eurozoo',
            long_name: 'Hurtownia Euro-zoo'
        }];
    }
}

module.exports.COUNTERPARTY = COUNTERPARTY;
module.exports = CounterpartyDescription;