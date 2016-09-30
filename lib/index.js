'use strict';

var integration = require('@astronomerio/analytics.js-integration');
var includes = require('lodash.includes');

var Taboola = module.exports = integration('Taboola')
.global('_tfa')
.option('scriptSrc', '')
.option('conversionEvents', '')
.tag('library', '<script src="//cdn.taboola.com/libtrc/{{ scriptSrc }}/tfa.js"></script>');

Taboola.prototype.initialize = function () {
  window._tfa = window._tfa || [];
  this.ready();
};

Taboola.prototype.loaded = function () {
  return !!(document.body && window._tfa);
};

Taboola.prototype.track = function(track) {
  var events = this.options.conversionEvents;
  var eventName = track.event();
  var sanitizedEventName = eventName.split(' ').join('_').toLowerCase();
  var revenue = track.revenue() || '1';

  if (includes(events, eventName)) {
    _tfa.push({
      notify: 'action',
      name: sanitizedEventName,
      revenue: revenue 
    });

    this.loadTaboola();
  } 
};


Taboola.prototype.loadTaboola = function () {
  var scriptSrc = this.options.scriptSrc;
  this.load('library', {
    scriptSrc: scriptSrc
  });
};
