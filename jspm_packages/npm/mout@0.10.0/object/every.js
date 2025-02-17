/* */ 
var forOwn = require('./forOwn');
var makeIterator = require('../function/makeIterator_');
function every(obj, callback, thisObj) {
  callback = makeIterator(callback, thisObj);
  var result = true;
  forOwn(obj, function(val, key) {
    if (!callback(val, key, obj)) {
      result = false;
      return false;
    }
  });
  return result;
}
module.exports = every;
