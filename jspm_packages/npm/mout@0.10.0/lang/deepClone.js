/* */ 
var clone = require('./clone');
var forOwn = require('../object/forOwn');
var kindOf = require('./kindOf');
var isPlainObject = require('./isPlainObject');
function deepClone(val, instanceClone) {
  switch (kindOf(val)) {
    case 'Object':
      return cloneObject(val, instanceClone);
    case 'Array':
      return cloneArray(val, instanceClone);
    default:
      return clone(val);
  }
}
function cloneObject(source, instanceClone) {
  if (isPlainObject(source)) {
    var out = {};
    forOwn(source, function(val, key) {
      this[key] = deepClone(val, instanceClone);
    }, out);
    return out;
  } else if (instanceClone) {
    return instanceClone(source);
  } else {
    return source;
  }
}
function cloneArray(arr, instanceClone) {
  var out = [],
      i = -1,
      n = arr.length,
      val;
  while (++i < n) {
    out[i] = deepClone(arr[i], instanceClone);
  }
  return out;
}
module.exports = deepClone;
