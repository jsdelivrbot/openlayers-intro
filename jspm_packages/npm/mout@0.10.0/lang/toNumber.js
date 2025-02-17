/* */ 
var isArray = require('./isArray');
function toNumber(val) {
  if (typeof val === 'number')
    return val;
  if (!val)
    return 0;
  if (typeof val === 'string')
    return parseFloat(val);
  if (isArray(val))
    return NaN;
  return Number(val);
}
module.exports = toNumber;
