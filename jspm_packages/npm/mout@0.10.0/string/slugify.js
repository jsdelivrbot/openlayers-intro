/* */ 
var toString = require('../lang/toString');
var replaceAccents = require('./replaceAccents');
var removeNonWord = require('./removeNonWord');
var trim = require('./trim');
function slugify(str, delimeter) {
  str = toString(str);
  if (delimeter == null) {
    delimeter = "-";
  }
  str = replaceAccents(str);
  str = removeNonWord(str);
  str = trim(str).replace(/ +/g, delimeter).toLowerCase();
  return str;
}
module.exports = slugify;
