/* */ 
var makeIterator = require('../function/makeIterator_');
function min(arr, iterator, thisObj) {
  if (arr == null || !arr.length) {
    return -Infinity;
  } else if (arr.length && !iterator) {
    return Math.min.apply(Math, arr);
  } else {
    iterator = makeIterator(iterator, thisObj);
    var result,
        compare = Infinity,
        value,
        temp;
    var i = -1,
        len = arr.length;
    while (++i < len) {
      value = arr[i];
      temp = iterator(value, i, arr);
      if (temp < compare) {
        compare = temp;
        result = value;
      }
    }
    return result;
  }
}
module.exports = min;
