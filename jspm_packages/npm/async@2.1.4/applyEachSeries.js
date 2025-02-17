/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _applyEach = require('./internal/applyEach');
  var _applyEach2 = _interopRequireDefault(_applyEach);
  var _mapSeries = require('./mapSeries');
  var _mapSeries2 = _interopRequireDefault(_mapSeries);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = (0, _applyEach2.default)(_mapSeries2.default);
  module.exports = exports['default'];
})(require('process'));
