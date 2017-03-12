class CounterpartyDescription {
    static get keyArti() {
        return this.datasets[0].name;
    }

    static get keyZooleszcz() {
        return this.datasets[1].name;
    }

    static get keyEurozoo() {
        return this.datasets[2].name;
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

module.exports = CounterpartyDescription;