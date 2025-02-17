/* */ 
var toNumber = require('../lang/toNumber');
function sign(val) {
  var num = toNumber(val);
  if (num === 0)
    return num;
  if (isNaN(num))
    return num;
  return num < 0 ? -1 : 1;
}
module.exports = sign;
