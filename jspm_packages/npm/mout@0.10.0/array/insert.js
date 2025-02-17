/* */ 
var difference = require('./difference');
var slice = require('./slice');
function insert(arr, rest_items) {
  var diff = difference(slice(arguments, 1), arr);
  if (diff.length) {
    Array.prototype.push.apply(arr, diff);
  }
  return arr.length;
}
module.exports = insert;
