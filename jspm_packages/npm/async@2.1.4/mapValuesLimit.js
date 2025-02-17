/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = mapValuesLimit;
var _eachOfLimit = require('./eachOfLimit');
var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);
var _noop = require('lodash/noop');
var _noop2 = _interopRequireDefault(_noop);
var _once = require('./internal/once');
var _once2 = _interopRequireDefault(_once);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function mapValuesLimit(obj, limit, iteratee, callback) {
  callback = (0, _once2.default)(callback || _noop2.default);
  var newObj = {};
  (0, _eachOfLimit2.default)(obj, limit, function(val, key, next) {
    iteratee(val, key, function(err, result) {
      if (err)
        return next(err);
      newObj[key] = result;
      next();
    });
  }, function(err) {
    callback(err, newObj);
  });
}
module.exports = exports['default'];
