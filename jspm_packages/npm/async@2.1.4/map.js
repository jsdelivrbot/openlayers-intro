/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _doParallel = require('./internal/doParallel');
  var _doParallel2 = _interopRequireDefault(_doParallel);
  var _map = require('./internal/map');
  var _map2 = _interopRequireDefault(_map);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = (0, _doParallel2.default)(_map2.default);
  module.exports = exports['default'];
})(require('process'));
