/* */ 
var is = require('./is');
var isObject = require('./isObject');
var isArray = require('./isArray');
var objEquals = require('../object/equals');
var arrEquals = require('../array/equals');
function deepEquals(a, b, callback) {
  callback = callback || is;
  var bothObjects = isObject(a) && isObject(b);
  var bothArrays = !bothObjects && isArray(a) && isArray(b);
  if (!bothObjects && !bothArrays) {
    return callback(a, b);
  }
  function compare(a, b) {
    return deepEquals(a, b, callback);
  }
  var method = bothObjects ? objEquals : arrEquals;
  return method(a, b, compare);
}
module.exports = deepEquals;
