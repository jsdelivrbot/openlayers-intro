/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = memoize;
var _identity = require('lodash/identity');
var _identity2 = _interopRequireDefault(_identity);
var _rest = require('./internal/rest');
var _rest2 = _interopRequireDefault(_rest);
var _setImmediate = require('./internal/setImmediate');
var _setImmediate2 = _interopRequireDefault(_setImmediate);
var _initialParams = require('./internal/initialParams');
var _initialParams2 = _interopRequireDefault(_initialParams);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function has(obj, key) {
  return key in obj;
}
function memoize(fn, hasher) {
  var memo = Object.create(null);
  var queues = Object.create(null);
  hasher = hasher || _identity2.default;
  var memoized = (0, _initialParams2.default)(function memoized(args, callback) {
    var key = hasher.apply(null, args);
    if (has(memo, key)) {
      (0, _setImmediate2.default)(function() {
        callback.apply(null, memo[key]);
      });
    } else if (has(queues, key)) {
      queues[key].push(callback);
    } else {
      queues[key] = [callback];
      fn.apply(null, args.concat([(0, _rest2.default)(function(args) {
        memo[key] = args;
        var q = queues[key];
        delete queues[key];
        for (var i = 0,
            l = q.length; i < l; i++) {
          q[i].apply(null, args);
        }
      })]));
    }
  });
  memoized.memo = memo;
  memoized.unmemoized = fn;
  return memoized;
}
module.exports = exports['default'];
