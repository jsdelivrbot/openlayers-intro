/* */ 
(function(process) {
  'use strict';
  var co = require('co');
  var thunkify = require('../index');
  function async(foo, bar, callback) {
    setImmediate(function() {
      callback(null, {
        foo: foo,
        bar: bar
      });
    });
  }
  var n = 1000000;
  var asyncThunk = thunkify(async);
  var asyncGen = thunkify.genify(async);
  console.log('\n  thunkify benchmark\n  node version: %s, date: %s\n  Starting...\n', process.version, Date());
  co(function*() {
    var start = Date.now();
    for (var i = 0; i < n; i++) {
      yield asyncThunk('a', 1);
    }
    var use = Date.now() - start;
    console.log("  yield asyncThunk('a', 1) %d times, use: %sms, qps: %s", n, use, n / use * 1000);
    var start = Date.now();
    for (var i = 0; i < n; i++) {
      yield asyncGen('a', 1);
    }
    var use = Date.now() - start;
    console.log("  yield asyncGen('a', 1) %d times, use: %sms, qps: %s", n, use, n / use * 1000);
    var start = Date.now();
    for (var i = 0; i < n; i++) {
      yield* asyncGen('a', 1);
    }
    var use = Date.now() - start;
    console.log("  yield* asyncGen('a', 1) %d times, use: %sms, qps: %s", n, use, n / use * 1000);
  })();
})(require('process'));
