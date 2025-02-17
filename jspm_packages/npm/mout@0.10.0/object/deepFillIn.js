/* */ 
var forOwn = require('./forOwn');
var isPlainObject = require('../lang/isPlainObject');
function deepFillIn(target, defaults) {
  var i = 0,
      n = arguments.length,
      obj;
  while (++i < n) {
    obj = arguments[i];
    if (obj) {
      forOwn(obj, function(newValue, key) {
        var curValue = target[key];
        if (curValue == null) {
          target[key] = newValue;
        } else if (isPlainObject(curValue) && isPlainObject(newValue)) {
          deepFillIn(curValue, newValue);
        }
      });
    }
  }
  return target;
}
module.exports = deepFillIn;
