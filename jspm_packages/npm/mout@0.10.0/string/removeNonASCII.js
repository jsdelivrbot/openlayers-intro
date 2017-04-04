/* */ 
var toString = require('../lang/toString');
function removeNonASCII(str) {
  str = toString(str);
  return str.replace(/[^\x20-\x7E]/g, '');
}
module.exports = removeNonASCII;
