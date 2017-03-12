let request = require('supertest');
let SingleTest = require('../../../utils/SingleTest');
let Identifiers = require('../../../utils/Identifiers');
let Datasets = require('../../../utils/Datasets');
let Description = require('./InvoiceDescription');

class InvoiceCreation extends SingleTest {
    get defaults() {
        return {
            type: 'Buy'
        };
    }

    get datasets() {
        let data = Description.datasets;

        // saved for update validation
        Datasets.invoice.set(Description.keyArti, data[0]);
        return data;
    }

    apiCall(data, cb) {
        return request(SingleTest.apiURL)
            .post('/invoice')
            .send(data)
            .expect(200)
            .end(cb);
    }

    finalize(res) {
        super.finalize(res);

        res.creation_date.should.greaterThan(res.document_date);
        Identifiers.invoice.set(res.name, res._id);
    }
}

module.exports = new InvoiceCreation();
