/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _createTester = require('./internal/createTester');
var _createTester2 = _interopRequireDefault(_createTester);
var _eachOf = require('./eachOf');
var _eachOf2 = _interopRequireDefault(_eachOf);
var _identity = require('lodash/identity');
var _identity2 = _interopRequireDefault(_identity);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
exports.default = (0, _createTester2.default)(_eachOf2.default, Boolean, _identity2.default);
module.exports = exports['default'];
