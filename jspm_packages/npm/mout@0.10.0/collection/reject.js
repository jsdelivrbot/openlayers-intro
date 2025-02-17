/* */ 
var filter = require('./filter');
var makeIterator = require('../function/makeIterator_');
function reject(list, iterator, thisObj) {
  iterator = makeIterator(iterator, thisObj);
  return filter(list, function(value, index, list) {
    return !iterator(value, index, list);
  }, thisObj);
}
module.exports = reject;
