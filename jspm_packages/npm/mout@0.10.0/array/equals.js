/* */ 
var is = require('../lang/is');
var isArray = require('../lang/isArray');
var every = require('./every');
function equals(a, b, callback) {
  callback = callback || is;
  if (!isArray(a) || !isArray(b)) {
    return callback(a, b);
  }
  if (a.length !== b.length) {
    return false;
  }
  return every(a, makeCompare(callback), b);
}
function makeCompare(callback) {
  return function(value, i) {
    return i in this && callback(value, this[i]);
  };
}
module.exports = equals;
