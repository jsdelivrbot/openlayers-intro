/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = function(opts, task) {
    if (!task) {
      task = opts;
      opts = null;
    }
    return (0, _initialParams2.default)(function(args, callback) {
      function taskFn(cb) {
        task.apply(null, args.concat([cb]));
      }
      if (opts)
        (0, _retry2.default)(opts, taskFn, callback);
      else
        (0, _retry2.default)(taskFn, callback);
    });
  };
  var _retry = require('./retry');
  var _retry2 = _interopRequireDefault(_retry);
  var _initialParams = require('./internal/initialParams');
  var _initialParams2 = _interopRequireDefault(_initialParams);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  module.exports = exports['default'];
})(require('process'));
