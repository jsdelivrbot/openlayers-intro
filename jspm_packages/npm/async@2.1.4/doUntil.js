/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = doUntil;
var _doWhilst = require('./doWhilst');
var _doWhilst2 = _interopRequireDefault(_doWhilst);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function doUntil(fn, test, callback) {
  (0, _doWhilst2.default)(fn, function() {
    return !test.apply(this, arguments);
  }, callback);
}
module.exports = exports['default'];
