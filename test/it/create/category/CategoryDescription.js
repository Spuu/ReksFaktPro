class CategoryDescription {
    static get keyProduct() {
        return this.datasets[0].name;
    }

    static get keyKarma() {
        return this.datasets[1].name;
    }

    static get keySzafa() {
        return this.datasets[2].name;
    }

    static get datasets() {
        return [
            {
                name: 'Product 23',
                type: 'Substitution'
            },
            {
                name: 'Karma',
                type: 'Product'
            },
            {
                name: 'Szafa 12',
                type: 'Location'
            }];
    }
}

module.exports = CategoryDescription;