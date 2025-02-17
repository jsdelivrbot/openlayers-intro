/* */ 
var kindOf = require('./kindOf');
var GLOBAL = require('./GLOBAL');
function toArray(val) {
  var ret = [],
      kind = kindOf(val),
      n;
  if (val != null) {
    if (val.length == null || kind === 'String' || kind === 'Function' || kind === 'RegExp' || val === GLOBAL) {
      ret[ret.length] = val;
    } else {
      n = val.length;
      while (n--) {
        ret[n] = val[n];
      }
    }
  }
  return ret;
}
module.exports = toArray;
