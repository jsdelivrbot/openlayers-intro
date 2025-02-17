/* */ 
var toString = require('../lang/toString');
function escapeUnicode(str, shouldEscapePrintable) {
  str = toString(str);
  return str.replace(/[\s\S]/g, function(ch) {
    if (!shouldEscapePrintable && (/[\x20-\x7E]/).test(ch)) {
      return ch;
    }
    return '\\u' + ('000' + ch.charCodeAt(0).toString(16)).slice(-4);
  });
}
module.exports = escapeUnicode;
