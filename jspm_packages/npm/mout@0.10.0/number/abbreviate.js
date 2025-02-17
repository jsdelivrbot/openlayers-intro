/* */ 
var enforcePrecision = require('./enforcePrecision');
var _defaultDict = {
  thousand: 'K',
  million: 'M',
  billion: 'B'
};
function abbreviateNumber(val, nDecimals, dict) {
  nDecimals = nDecimals != null ? nDecimals : 1;
  dict = dict || _defaultDict;
  val = enforcePrecision(val, nDecimals);
  var str,
      mod;
  if (val < 1000000) {
    mod = enforcePrecision(val / 1000, nDecimals);
    str = mod < 1000 ? mod + dict.thousand : 1 + dict.million;
  } else if (val < 1000000000) {
    mod = enforcePrecision(val / 1000000, nDecimals);
    str = mod < 1000 ? mod + dict.million : 1 + dict.billion;
  } else {
    str = enforcePrecision(val / 1000000000, nDecimals) + dict.billion;
  }
  return str;
}
module.exports = abbreviateNumber;
