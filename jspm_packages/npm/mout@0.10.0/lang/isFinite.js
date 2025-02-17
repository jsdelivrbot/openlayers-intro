/* */ 
var isNumber = require('./isNumber');
var GLOBAL = require('./GLOBAL');
function isFinite(val) {
  var is = false;
  if (typeof val === 'string' && val !== '') {
    is = GLOBAL.isFinite(parseFloat(val));
  } else if (isNumber(val)) {
    is = GLOBAL.isFinite(val);
  }
  return is;
}
module.exports = isFinite;
