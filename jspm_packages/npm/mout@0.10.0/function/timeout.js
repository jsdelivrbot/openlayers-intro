/* */ 
var slice = require('../array/slice');
function timeout(fn, millis, context) {
  var args = slice(arguments, 3);
  return setTimeout(function() {
    fn.apply(context, args);
  }, millis);
}
module.exports = timeout;
