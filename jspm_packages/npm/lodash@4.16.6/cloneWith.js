/* */ 
var baseClone = require('./_baseClone');
function cloneWith(value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(value, false, true, customizer);
}
module.exports = cloneWith;
