/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = eachLimit;
  var _eachOf = require('./eachOf');
  var _eachOf2 = _interopRequireDefault(_eachOf);
  var _withoutIndex = require('./internal/withoutIndex');
  var _withoutIndex2 = _interopRequireDefault(_withoutIndex);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function eachLimit(coll, iteratee, callback) {
    (0, _eachOf2.default)(coll, (0, _withoutIndex2.default)(iteratee), callback);
  }
  module.exports = exports['default'];
})(require('process'));
