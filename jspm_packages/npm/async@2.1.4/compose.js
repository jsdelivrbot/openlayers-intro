/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _seq = require('./seq');
var _seq2 = _interopRequireDefault(_seq);
var _rest = require('./internal/rest');
var _rest2 = _interopRequireDefault(_rest);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
exports.default = (0, _rest2.default)(function(args) {
  return _seq2.default.apply(null, args.reverse());
});
module.exports = exports['default'];
