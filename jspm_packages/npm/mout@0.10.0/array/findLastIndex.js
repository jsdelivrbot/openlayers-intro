/* */ 
var makeIterator = require('../function/makeIterator_');
function findLastIndex(arr, iterator, thisObj) {
  iterator = makeIterator(iterator, thisObj);
  if (arr == null) {
    return -1;
  }
  var n = arr.length;
  while (--n >= 0) {
    if (iterator(arr[n], n, arr)) {
      return n;
    }
  }
  return -1;
}
module.exports = findLastIndex;
