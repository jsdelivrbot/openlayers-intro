/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = reflectAll;
var _reflect = require('./reflect');
var _reflect2 = _interopRequireDefault(_reflect);
var _isArray = require('lodash/isArray');
var _isArray2 = _interopRequireDefault(_isArray);
var _arrayMap2 = require('lodash/_arrayMap');
var _arrayMap3 = _interopRequireDefault(_arrayMap2);
var _baseForOwn = require('lodash/_baseForOwn');
var _baseForOwn2 = _interopRequireDefault(_baseForOwn);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function reflectAll(tasks) {
  var results;
  if ((0, _isArray2.default)(tasks)) {
    results = (0, _arrayMap3.default)(tasks, _reflect2.default);
  } else {
    results = {};
    (0, _baseForOwn2.default)(tasks, function(task, key) {
      results[key] = _reflect2.default.call(this, task);
    });
  }
  return results;
}
module.exports = exports['default'];
