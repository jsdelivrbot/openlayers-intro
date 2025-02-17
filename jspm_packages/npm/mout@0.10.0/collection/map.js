/* */ 
var isObject = require('../lang/isObject');
var values = require('../object/values');
var arrMap = require('../array/map');
var makeIterator = require('../function/makeIterator_');
function map(list, callback, thisObj) {
  callback = makeIterator(callback, thisObj);
  if (isObject(list) && list.length == null) {
    list = values(list);
  }
  return arrMap(list, function(val, key, list) {
    return callback(val, key, list);
  });
}
module.exports = map;
