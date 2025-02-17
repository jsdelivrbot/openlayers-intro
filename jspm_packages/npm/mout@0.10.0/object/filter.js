/* */ 
var forOwn = require('./forOwn');
var makeIterator = require('../function/makeIterator_');
function filterValues(obj, callback, thisObj) {
  callback = makeIterator(callback, thisObj);
  var output = {};
  forOwn(obj, function(value, key, obj) {
    if (callback(value, key, obj)) {
      output[key] = value;
    }
  });
  return output;
}
module.exports = filterValues;
