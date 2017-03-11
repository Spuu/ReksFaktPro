var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('.././TestManager');

module.exports = function (done) {
    var obj = {
        name: 'Czołgistów 23'
    };

    request(config.api_url)
        .put('/store/' + TestManager.getId('store_czołgistów'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.should.have.property('_id');
            res.body.name.should.equal(obj.name);

            done();
        });
};