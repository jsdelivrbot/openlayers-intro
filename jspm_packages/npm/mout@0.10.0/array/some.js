/* */ 
var makeIterator = require('../function/makeIterator_');
function some(arr, callback, thisObj) {
  callback = makeIterator(callback, thisObj);
  var result = false;
  if (arr == null) {
    return result;
  }
  var i = -1,
      len = arr.length;
  while (++i < len) {
    if (callback(arr[i], i, arr)) {
      result = true;
      break;
    }
  }
  return result;
}
module.exports = some;
