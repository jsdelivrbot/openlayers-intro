/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.hasNextTick = exports.hasSetImmediate = undefined;
  exports.fallback = fallback;
  exports.wrap = wrap;
  var _rest = require('./rest');
  var _rest2 = _interopRequireDefault(_rest);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
  var hasNextTick = exports.hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';
  function fallback(fn) {
    setTimeout(fn, 0);
  }
  function wrap(defer) {
    return (0, _rest2.default)(function(fn, args) {
      defer(function() {
        fn.apply(null, args);
      });
    });
  }
  var _defer;
  if (hasSetImmediate) {
    _defer = setImmediate;
  } else if (hasNextTick) {
    _defer = process.nextTick;
  } else {
    _defer = fallback;
  }
  exports.default = wrap(_defer);
})(require('process'));
