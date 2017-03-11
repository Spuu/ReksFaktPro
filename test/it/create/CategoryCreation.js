let request = require('supertest');
let SingleTest = require('../../utils/SingleTest');
let Identifiers = require('../../utils/Identifiers');

class CategoryCreation extends SingleTest {
    get defaults() {
        return [];
    }

    get datasets() {
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

    apiCall(data, cb) {
        return request(SingleTest.apiURL)
            .post('/category')
            .send(data)
            .expect(200)
            .end(cb);
    }

    finalize(res) {
        super.finalize(res);
    }
}

module.exports = new CategoryCreation();