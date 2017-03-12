let request = require('supertest');
let Datasets = require('../../utils/Datasets');
let Identifiers = require('../../utils/Identifiers');
let SingleTest = require('../../utils/SingleTest');
let Description = require('./CounterpartyDescription');

class CounterpartyCreation extends SingleTest {
    get defaults() {
        return [];
    }

    get datasets() {
        let data = Description.datasets;

        // saved for update validation
        Datasets.set(Description.keyArti, data[0]);
        return data;
    }

    apiCall(data, cb) {
        return request(SingleTest.apiURL)
            .post('/counterparty')
            .send(data)
            .expect(200)
            .end(cb);
    }

    finalize(res) {
        super.finalize(res);
        Identifiers.counterparty.set(Description.COUNTERPARTY + res.name, res._id);
    }
}

module.exports = new CounterpartyCreation();
