/* */ 
var some = require('./some');
var makeIterator = require('../function/makeIterator_');
function find(obj, callback, thisObj) {
  callback = makeIterator(callback, thisObj);
  var result;
  some(obj, function(value, key, obj) {
    if (callback(value, key, obj)) {
      result = value;
      return true;
    }
  });
  return result;
}
module.exports = find;
