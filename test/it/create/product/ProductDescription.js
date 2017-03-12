class ProductDescription {
    static get keyProd1() {
        return this.datasets[0].name;
    }

    static get keyProd2() {
        return this.datasets[1].name;
    }

    static get keyProd3() {
        return this.datasets[2].name;
    }

    static get keyProd4() {
        return this.datasets[3].name;
    }

    static get datasets() {
        return [
            {
                cash_register: {name: 'Prod 1'}, // updated: Prod 1
                ean: '1231111111111', // updated
                name: 'Produkt pierwszy',
                pih_amount: 123, // updated: 1234
                pih_unit: 'g',
                vat: 8 // updated: 23
            },
            {
                cash_register: {name: 'Prod 2'},
                ean: '1232222222222',
                name: 'Produkt drugi',
                pih_amount: 222,
                pih_unit: 'kg',
                vat: 8
            },
            {
                cash_register: {name: 'Prod 3'},
                ean: '1233333333333',
                name: 'Produkt trzeci',
                pih_amount: 333,
                pih_unit: 'l',
                vat: 5
            },
            {
                cash_register: {name: 'Prod 4'},
                ean: '4444444444444',
                name: 'Produkt czwarty',
                pih_amount: 444,
                sell_unit: 'kg',
                vat: 0
            }
        ];
    }
}

module.exports = ProductDescription;