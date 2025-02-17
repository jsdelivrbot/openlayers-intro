/* */ 
var forEach = require('./forEach');
var makeIterator = require('../function/makeIterator_');
function filter(list, iterator, thisObj) {
  iterator = makeIterator(iterator, thisObj);
  var results = [];
  if (!list) {
    return results;
  }
  forEach(list, function(value, index, list) {
    if (iterator(value, index, list)) {
      results[results.length] = value;
    }
  });
  return results;
}
module.exports = filter;
