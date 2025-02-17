/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = timeLimit;
var _mapLimit = require('./mapLimit');
var _mapLimit2 = _interopRequireDefault(_mapLimit);
var _baseRange = require('lodash/_baseRange');
var _baseRange2 = _interopRequireDefault(_baseRange);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function timeLimit(count, limit, iteratee, callback) {
  (0, _mapLimit2.default)((0, _baseRange2.default)(0, count, 1), limit, iteratee, callback);
}
module.exports = exports['default'];
