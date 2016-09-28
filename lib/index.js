'use strict';

var integration = require('@segment/analytics.js-integration');
var _ = require('lodash');

var Taboola = module.exports = integration('Taboola')
.option('scriptSrc', '')
.option('conversionEvents', '')
.tag('library', '<script src="//cdn.taboola.com/libtrc/{{ scriptSrc }}/tfa.js"></script>');

Taboola.prototype.loaded = function () {
    return !!window._tfa;
};

Taboola.prototype.track = function(track) {
    var events = this.options.conversionEvents;
    var eventName = track.event();
    var sanitizedEventName = eventName.split(' ').join('_').toLowerCase();
    var revenue = track.revenue() || '1';
    window._tfa = window._tfa || [];
    if (events.includes(eventName)) {
        _tfa.push({ notify: 'action', name: sanitizedEventName, revenue: revenue });
        this.loadTaboola();
    } 
};
