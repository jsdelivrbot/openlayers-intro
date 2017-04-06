/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = whilst;
var _noop = require('lodash/noop');
var _noop2 = _interopRequireDefault(_noop);
var _rest = require('./internal/rest');
var _rest2 = _interopRequireDefault(_rest);
var _onlyOnce = require('./internal/onlyOnce');
var _onlyOnce2 = _interopRequireDefault(_onlyOnce);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function whilst(test, iteratee, callback) {
  callback = (0, _onlyOnce2.default)(callback || _noop2.default);
  if (!test())
    return callback(null);
  var next = (0, _rest2.default)(function(err, args) {
    if (err)
      return callback(err);
    if (test())
      return iteratee(next);
    callback.apply(null, [null].concat(args));
  });
  iteratee(next);
}
module.exports = exports['default'];
