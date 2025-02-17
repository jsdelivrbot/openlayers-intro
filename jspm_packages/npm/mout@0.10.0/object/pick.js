/* */ 
var slice = require('../array/slice');
function pick(obj, var_keys) {
  var keys = typeof arguments[1] !== 'string' ? arguments[1] : slice(arguments, 1),
      out = {},
      i = 0,
      key;
  while (key = keys[i++]) {
    out[key] = obj[key];
  }
  return out;
}
module.exports = pick;
