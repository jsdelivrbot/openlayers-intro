/* */ 
var forOwn = require('./forOwn');
var makeIterator = require('../function/makeIterator_');
function mapValues(obj, callback, thisObj) {
  callback = makeIterator(callback, thisObj);
  var output = {};
  forOwn(obj, function(val, key, obj) {
    output[key] = callback(val, key, obj);
  });
  return output;
}
module.exports = mapValues;
