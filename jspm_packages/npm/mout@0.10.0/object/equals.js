/* */ 
var hasOwn = require('./hasOwn');
var every = require('./every');
var isObject = require('../lang/isObject');
var is = require('../lang/is');
function makeCompare(callback) {
  return function(value, key) {
    return hasOwn(this, key) && callback(value, this[key]);
  };
}
function checkProperties(value, key) {
  return hasOwn(this, key);
}
function equals(a, b, callback) {
  callback = callback || is;
  if (!isObject(a) || !isObject(b)) {
    return callback(a, b);
  }
  return (every(a, makeCompare(callback), b) && every(b, checkProperties, a));
}
module.exports = equals;
