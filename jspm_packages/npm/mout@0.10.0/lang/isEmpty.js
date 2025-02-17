/* */ 
var forOwn = require('../object/forOwn');
var isArray = require('./isArray');
function isEmpty(val) {
  if (val == null) {
    return true;
  } else if (typeof val === 'string' || isArray(val)) {
    return !val.length;
  } else if (typeof val === 'object') {
    var result = true;
    forOwn(val, function() {
      result = false;
      return false;
    });
    return result;
  } else {
    return true;
  }
}
module.exports = isEmpty;
