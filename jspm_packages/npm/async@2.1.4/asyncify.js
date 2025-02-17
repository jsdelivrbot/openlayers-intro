/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = asyncify;
  var _isObject = require('lodash/isObject');
  var _isObject2 = _interopRequireDefault(_isObject);
  var _initialParams = require('./internal/initialParams');
  var _initialParams2 = _interopRequireDefault(_initialParams);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function asyncify(func) {
    return (0, _initialParams2.default)(function(args, callback) {
      var result;
      try {
        result = func.apply(this, args);
      } catch (e) {
        return callback(e);
      }
      if ((0, _isObject2.default)(result) && typeof result.then === 'function') {
        result.then(function(value) {
          callback(null, value);
        }, function(err) {
          callback(err.message ? err : new Error(err));
        });
      } else {
        callback(null, result);
      }
    });
  }
  module.exports = exports['default'];
})(require('process'));
