/* */ 
var baseClone = require('./_baseClone');
function cloneDeepWith(value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(value, true, true, customizer);
}
module.exports = cloneDeepWith;
