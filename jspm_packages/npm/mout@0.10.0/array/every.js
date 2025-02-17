/* */ 
var makeIterator = require('../function/makeIterator_');
function every(arr, callback, thisObj) {
  callback = makeIterator(callback, thisObj);
  var result = true;
  if (arr == null) {
    return result;
  }
  var i = -1,
      len = arr.length;
  while (++i < len) {
    if (!callback(arr[i], i, arr)) {
      result = false;
      break;
    }
  }
  return result;
}
module.exports = every;
