'use strict';

var integration = require('analytics.js-integration');

var Taboola = module.exports = integration('Taboola')
.option('conversionEvents', '');

Taboola.prototype.track = function (track) {

};

Taboola.prototype.fireConversionPixel = function (track) {

}

