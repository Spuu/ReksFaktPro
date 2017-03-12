let request = require('supertest');
let SingleTest = require('../../../utils/SingleTest');
let Identifiers = require('../../../utils/Identifiers');
let Description = require('./CategoryDescription');

class CategoryCreation extends SingleTest {
    get defaults() {
        return [];
    }

    get datasets() {
        return Description.datasets;
    }

    apiCall(data, cb) {
        return request(SingleTest.apiURL)
            .post('/category')
            .send(data)
            .expect(200)
            .end(cb);
    }

    finalize(res) {
        super.finalize(res);

        Identifiers.category.set(res.name, res._id);
    }
}

module.exports = new CategoryCreation();