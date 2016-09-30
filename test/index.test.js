'use strict';

var Analytics = require('@astronomerio/analytics.js-core').constructor;
var Taboola = require('../lib');
var integration = require('@astronomerio/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');

describe('Taboola', function() {
  var analytics;
  var taboola;
  var options = {
    scriptSrc: 'test',
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
    });

    describe('#track', function () {
      beforeEach(function () {
        analytics.stub(window._tfa, 'push');
        analytics.stub(taboola, 'loadTaboola');
      });

      it('should push event to window._tfa', function () {
        analytics.track('Email Sign Up', { revenue: 42 });
        analytics.called(window._tfa.push);
        analytics.called(taboola.loadTaboola);
      });

      it('should not track unknown events', function () {
        analytics.track('unknown event');
        analytics.didNotCall(window._tfa.push);
        analytics.didNotCall(taboola.loadTaboola);
      });
    });

    // describe('#loadTaboola', function () {
    //   it('should add script tag', function () {
    //     var scriptCount = document.getElementsByTagName('script').length;
    //     analytics.track('Email Sign Up');
    //     var newScriptCount = document.getElementsByTagName('script').length;
    //     analytics.equal(scriptCount + 1, newScriptCount);
    //   });
    // });
  });
});
