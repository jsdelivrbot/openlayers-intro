/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _setImmediate = require('./internal/setImmediate');
  var _defer;
  if (_setImmediate.hasNextTick) {
    _defer = process.nextTick;
  } else if (_setImmediate.hasSetImmediate) {
    _defer = setImmediate;
  } else {
    _defer = _setImmediate.fallback;
  }
  exports.default = (0, _setImmediate.wrap)(_defer);
  module.exports = exports['default'];
})(require('process'));
