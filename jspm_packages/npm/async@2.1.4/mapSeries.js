/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _mapLimit = require('./mapLimit');
var _mapLimit2 = _interopRequireDefault(_mapLimit);
var _doLimit = require('./internal/doLimit');
var _doLimit2 = _interopRequireDefault(_doLimit);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
exports.default = (0, _doLimit2.default)(_mapLimit2.default, 1);
module.exports = exports['default'];
