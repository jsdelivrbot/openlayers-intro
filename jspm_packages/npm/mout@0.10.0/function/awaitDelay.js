/* */ 
var now = require('../time/now');
var timeout = require('./timeout');
var append = require('../array/append');
function awaitDelay(callback, delay) {
  var baseTime = now() + delay;
  return function() {
    var ms = Math.max(baseTime - now(), 4);
    return timeout.apply(this, append([callback, ms, this], arguments));
  };
}
module.exports = awaitDelay;
