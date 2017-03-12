class StoreDescription {
    static get keyCz32() {
        return this.datasets[0].name;
    }

    static get keySt40() {
        return this.datasets[1].name;
    }

    static get keySt15() {
        return this.datasets[2].name;
    }

    static get keySlow() {
        return this.datasets[3].name;
    }

    static get datasets() {
        return [
            {
                name: 'Cz32',
                long_name: 'Czołgistów'
            },
            {
                name: 'St40',
                long_name: 'Staromiejska 40'
            },
            {
                name: 'St15',
                long_name: 'Staromiejska 15'
            },
            {
                name: 'Słow',
                long_name: 'Słowackiego'
            }
        ];
    }
}

module.exports = StoreDescription;