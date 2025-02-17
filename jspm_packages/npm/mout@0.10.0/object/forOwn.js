/* */ 
var hasOwn = require('./hasOwn');
var forIn = require('./forIn');
function forOwn(obj, fn, thisObj) {
  forIn(obj, function(val, key) {
    if (hasOwn(obj, key)) {
      return fn.call(thisObj, obj[key], key, obj);
    }
  });
}
module.exports = forOwn;
