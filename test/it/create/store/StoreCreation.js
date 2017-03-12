let request = require('supertest');
let Datasets = require('../../../utils/Datasets');
let Identifiers = require('../../../utils/Identifiers');
let SingleTest = require('../../../utils/SingleTest');
let Description = require('./../store/StoreDescription');

class StoreCreation extends SingleTest {
    get defaults() {
        return [];
    }

    get datasets() {
        return Description.datasets;
    }

    apiCall(data, cb) {
        return request(SingleTest.apiURL)
            .post('/store')
            .send(data)
            .expect(200)
            .end(cb);
    }

    finalize(res) {
        super.finalize(res);
        Identifiers.store.set(res.name, res._id);
    }
}

module.exports = new StoreCreation();
