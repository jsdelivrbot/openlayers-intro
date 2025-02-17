/* */ 
var slice = require('./slice');
function invoke(arr, methodName, var_args) {
  if (arr == null) {
    return arr;
  }
  var args = slice(arguments, 2);
  var i = -1,
      len = arr.length,
      value;
  while (++i < len) {
    value = arr[i];
    value[methodName].apply(value, args);
  }
  return arr;
}
module.exports = invoke;
