/* */ 
var hasOwn = require('./hasOwn');
var deepClone = require('../lang/deepClone');
var isObject = require('../lang/isObject');
function merge() {
  var i = 1,
      key,
      val,
      obj,
      target;
  target = deepClone(arguments[0]);
  while (obj = arguments[i++]) {
    for (key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }
      val = obj[key];
      if (isObject(val) && isObject(target[key])) {
        target[key] = merge(target[key], val);
      } else {
        target[key] = deepClone(val);
      }
    }
  }
  return target;
}
module.exports = merge;
