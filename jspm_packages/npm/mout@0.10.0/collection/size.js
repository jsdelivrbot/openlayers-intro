/* */ 
var isArray = require('../lang/isArray');
var objSize = require('../object/size');
function size(list) {
  if (!list) {
    return 0;
  }
  if (isArray(list)) {
    return list.length;
  }
  return objSize(list);
}
module.exports = size;
