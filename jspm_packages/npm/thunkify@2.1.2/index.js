/* */ 
var assert = require('assert');
module.exports = thunkify;
function thunkify(fn) {
  assert('function' == typeof fn, 'function required');
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;
    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    return function(done) {
      var called;
      args.push(function() {
        if (called)
          return;
        called = true;
        done.apply(null, arguments);
      });
      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    };
  };
}
;
