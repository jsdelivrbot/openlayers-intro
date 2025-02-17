/* */ 
var filter = require('./filter');
var makeIterator = require('../function/makeIterator_');
function reject(obj, callback, thisObj) {
  callback = makeIterator(callback, thisObj);
  return filter(obj, function(value, index, obj) {
    return !callback(value, index, obj);
  }, thisObj);
}
module.exports = reject;
