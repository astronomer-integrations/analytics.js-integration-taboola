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
    var revenue = track.properties().revenue || '1';
    window._tfa = window._tfa || [];
    if (_.includes(events, eventName)) {
        eventName = eventName.split(' ').join('_').toLowerCase();
        window._tfa.push({ notify: 'action', name: eventName, revenue: revenue });
        this.load('library', { scriptSrc : this.options.scriptSrc });
    } 
};
