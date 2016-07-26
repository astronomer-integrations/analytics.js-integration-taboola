'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var Taboola = require('../lib');
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');

describe('Taboola', function() {
    var analytics;
    var taboola;

    beforeEach(function () {
        analytics = new Analytics();
        taboola = new Taboola();
        analytics.use(Taboola);
        analytics.use(tester);
        analytics.add(taboola);
    });

    afterEach(function () {
        analytics.restore();
        analytics.reset();
        analytics.reset();
        sandbox();
    });

    it('it should', function () {
    });

    describe('before loading', function () {
        it('should not have a _tfa object', function () {
            analytics.assert(!window._tfa);
        });
    });

    describe('loading', function () {
        it('should load', function (done) {
            analytics.load(taboola, done);
        });
    });

});
