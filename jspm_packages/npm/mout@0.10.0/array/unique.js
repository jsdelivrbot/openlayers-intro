/* */ 
var filter = require('./filter');
function unique(arr, compare) {
  compare = compare || isEqual;
  return filter(arr, function(item, i, arr) {
    var n = arr.length;
    while (++i < n) {
      if (compare(item, arr[i])) {
        return false;
      }
    }
    return true;
  });
}
function isEqual(a, b) {
  return a === b;
}
module.exports = unique;
