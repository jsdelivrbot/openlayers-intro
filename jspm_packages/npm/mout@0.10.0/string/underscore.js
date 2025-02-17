/* */ 
var toString = require('../lang/toString');
var slugify = require('./slugify');
var unCamelCase = require('./unCamelCase');
function underscore(str) {
  str = toString(str);
  str = unCamelCase(str);
  return slugify(str, "_");
}
module.exports = underscore;
