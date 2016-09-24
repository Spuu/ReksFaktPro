var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        name: 'Czołgistów'
    };

    request(config.api_url)
        .post('/store')
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.should.have.property('_id');
            res.body.name.should.equal('Czołgistów');

            TestManager.setId('store', res.body._id);

            done();
        });
};