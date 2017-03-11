"use strict";

let _ = require('lodash');
let should = require('should');
let config = require('../../config');
let Rx = require('rx');

class SingleTest {
    constructor() {

    }

    /**
     * Api URL
     * @returns {string}
     */
    static get apiURL() {
        return config.api_url;
    }

    /**
     * Default values set in a database.
     * Check if they're properly assigned.
     * @returns {Array} Default values for Mongo document
     */
    get defaults() {
        return [];
    }

    /**
     * Set of data provided with a request
     * @returns {Array} Set of data
     */
    get datasets() {
        return [];
    }

    /**
     * Mocha request expecting code 200
     * @param data provided data
     * @param cb response callback
     * @returns {function} request function
     */
    apiCall(data, cb) {
        return null;
    }

    /**
     * Additional post actions e.g. validation, identifiers save
     * @param res response body
     */
    finalize(res) {
        res.should.have.property('_id');
    }

    execute(done) {

        /**
         * Mocha request as observable
         */
        let callReq = Rx.Observable.fromNodeCallback(this.apiCall);

        /**
         * Observable sending request data (stream of input data)
         */
        let dataObs = Rx.Observable.from(this.datasets);

        /**
         * Observable sending merged concatenated request observables
         * (stream of requests that returns responses)
         */
        let resObs = dataObs.concatMap(function (x) {
            return callReq(x);
        });

        /**
         * Ties up initial dataset and response
         * @param data
         * @param res
         * @returns {{data: *, res: *}}
         */
        function data_res(data, res) {
            return {
                data: data,
                res: res
            }
        }

        /**
         * Validate response and compare it with initial dataset
         */
        Rx.Observable.zip(dataObs, resObs, data_res).subscribe(
            (obj) => {
                let res = obj.res;
                let data = obj.data;

                SingleTest.compare(res.body, Object.assign(data, this.defaults));
                this.finalize(res.body);
            },
            (err) => {
                throw err;
            },
            () => {
                done();
            }
        );
    }


    static compare(object, baseline) {
        _.each(baseline, (value, key) => {
            if (object[key] !== value)
                return false;
        });

        return true;
    }
}

module.exports = SingleTest;