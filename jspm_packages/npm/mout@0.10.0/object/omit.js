/* */ 
var slice = require('../array/slice');
var contains = require('../array/contains');
function omit(obj, var_keys) {
  var keys = typeof arguments[1] !== 'string' ? arguments[1] : slice(arguments, 1),
      out = {};
  for (var property in obj) {
    if (obj.hasOwnProperty(property) && !contains(keys, property)) {
      out[property] = obj[property];
    }
  }
  return out;
}
module.exports = omit;
