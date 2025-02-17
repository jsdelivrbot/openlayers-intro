/* */ 
var toString = require('../lang/toString');
var toInt = require('../number/toInt');
function repeat(str, n) {
  var result = '';
  str = toString(str);
  n = toInt(n);
  if (n < 1) {
    return '';
  }
  while (n > 0) {
    if (n % 2) {
      result += str;
    }
    n = Math.floor(n / 2);
    str += str;
  }
  return result;
}
module.exports = repeat;
