/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _mapValuesLimit = require('./mapValuesLimit');
  var _mapValuesLimit2 = _interopRequireDefault(_mapValuesLimit);
  var _doLimit = require('./internal/doLimit');
  var _doLimit2 = _interopRequireDefault(_doLimit);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = (0, _doLimit2.default)(_mapValuesLimit2.default, Infinity);
  module.exports = exports['default'];
})(require('process'));
