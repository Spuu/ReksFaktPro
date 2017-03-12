let request = require('supertest');
let Datasets = require('../../../utils/Datasets');
let Identifiers = require('../../../utils/Identifiers');
let SingleTest = require('../../../utils/SingleTest');
let Description = require('./../product/ProductDescription');

class ProductCreation extends SingleTest {
    get defaults() {
        return {
            enabled: true,
            is_barcode: false,
            pih_amount: 1,
            pih_unit: 'g',
            sell_unit: 'szt',
            vat: 23
        };
    }

    get datasets() {
        let data = Description.datasets;

        Datasets.product.set(Description.keyProd1, data[0]);
        Datasets.product.set(Description.keyProd2, data[1]);
        Datasets.product.set(Description.keyProd3, data[2]);
        Datasets.product.set(Description.keyProd4, data[3]);

        return data;
    }

    apiCall(data, cb) {
        return request(SingleTest.apiURL)
            .post('/product')
            .send(data)
            .expect(200)
            .end(cb);
    }

    finalize(res) {
        super.finalize(res);
        Identifiers.product.set(res.name, res._id);
    }
}

module.exports = new ProductCreation();
