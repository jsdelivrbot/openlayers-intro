/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _applyEach = require('./internal/applyEach');
  var _applyEach2 = _interopRequireDefault(_applyEach);
  var _map = require('./map');
  var _map2 = _interopRequireDefault(_map);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = (0, _applyEach2.default)(_map2.default);
  module.exports = exports['default'];
})(require('process'));
