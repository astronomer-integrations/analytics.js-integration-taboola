'use strict';

var integration = require('analytics.js-integration');

var Taboola = module.exports = integration('Taboola')
.option('scriptSrc', '')
.option('conversionEvents', '');

Taboola.prototype.track = function (track) {
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

Taboola.prototype.loadTaboola = function (track) {    
    var scriptSrc = this.options.scriptSrc;
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('async', true);

    scriptElement.src = '//cdn.taboola.com/libtrc/' + scriptSrc + '/tfa.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(scriptElement, s);
};

//Polyfill for Array.includes. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        var O = Object(this);
        var len = parseInt(O.length, 10) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1], 10) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {k = 0;}
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                    (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                return true;
            }
            k++;
        }
        return false;
    };
}

