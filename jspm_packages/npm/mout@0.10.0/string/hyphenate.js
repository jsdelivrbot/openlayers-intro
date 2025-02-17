/* */ 
var toString = require('../lang/toString');
var slugify = require('./slugify');
var unCamelCase = require('./unCamelCase');
function hyphenate(str) {
  str = toString(str);
  str = unCamelCase(str);
  return slugify(str, "-");
}
module.exports = hyphenate;
