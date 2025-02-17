/* */ 
var isFunction = require('../lang/isFunction');
function toLookup(arr, key) {
  var result = {};
  if (arr == null) {
    return result;
  }
  var i = -1,
      len = arr.length,
      value;
  if (isFunction(key)) {
    while (++i < len) {
      value = arr[i];
      result[key(value)] = value;
    }
  } else {
    while (++i < len) {
      value = arr[i];
      result[value[key]] = value;
    }
  }
  return result;
}
module.exports = toLookup;
