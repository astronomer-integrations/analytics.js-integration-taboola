'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var Taboola = require('../lib');
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');

describe('Taboola', function() {
    var analytics;
    var taboola;
    var options = {
        scriptSrc: '',
        conversionEvents: ['Bid on Item', 'Email Sign Up']
    };

    beforeEach(function () {
        analytics = new Analytics();
        taboola = new Taboola(options);
        analytics.use(Taboola);
        analytics.use(tester);
        analytics.add(taboola);
    });

    afterEach(function () {
        analytics.restore();
        analytics.reset();
        taboola.reset();
        sandbox();
    });

    it('it should have the right settings', function () {
        analytics.compare(Taboola, integration('Taboola')
        .option('scriptSrc', '')
        .option('conversionEvents', [])
        .tag('library', '<script src=//cdn.taboola.com/libtrc/{{ scriptSrc }}/tfa.js></script>'));
    });

    describe('before loading', function () {
        it('should not have a _tfa object', function () {
            analytics.assert(!window._tfa);
        });
    });

    describe('after loading', function () {
        beforeEach(function(done) {
            analytics.once('ready', done);
            analytics.initialize();
            analytics.page();
            analytics.stub(taboola, 'load');
        });

        describe('#track', function () {
            it('should set window._tfa on track', function () {
                analytics.track('Bid on Item');
                analytics.assert(window._tfa, 'window._tfa should exist for Bid on Item event');
                analytics.assert(window._tfa[0].name === 'bid_on_item');
                analytics.called(taboola.load);
            });

            it('should push event to window._tfa', function () {
                analytics.track('Email Sign Up', { revenue: 42 });
                analytics.assert(window._tfa[1].revenue == 42, 'should set revenue onto window._tfa');
                analytics.assert(window._tfa[1].name === 'email_sign_up');
                analytics.called(taboola.load);
            });

            it('should not track unknown events', function () {
                analytics.track('unknown event');
                analytics.didNotCall(taboola.load);
            });
        });
    });
});
