/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = until;
var _whilst = require('./whilst');
var _whilst2 = _interopRequireDefault(_whilst);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function until(test, fn, callback) {
  (0, _whilst2.default)(function() {
    return !test.apply(this, arguments);
  }, fn, callback);
}
module.exports = exports['default'];
