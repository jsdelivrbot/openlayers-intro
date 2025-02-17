/* */ 
var toString = require('../lang/toString');
function unescapeUnicode(str) {
  str = toString(str);
  return str.replace(/\\u[0-9a-f]{4}/g, function(ch) {
    var code = parseInt(ch.slice(2), 16);
    return String.fromCharCode(code);
  });
}
module.exports = unescapeUnicode;
