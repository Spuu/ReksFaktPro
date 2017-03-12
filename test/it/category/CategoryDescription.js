const CATEGORY = 'category_';

class CategoryDescription {
    static get keyProduct() {
        return CATEGORY + this.datasets[0].name;
    }

    static get keyKarma() {
        return CATEGORY + this.datasets[1].name;
    }

    static get keySzafa() {
        return CATEGORY + this.datasets[2].name;
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

module.exports.CATEGORY = CATEGORY;
module.exports = CategoryDescription;