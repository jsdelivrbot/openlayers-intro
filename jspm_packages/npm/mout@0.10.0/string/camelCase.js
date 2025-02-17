/* */ 
var toString = require('../lang/toString');
var replaceAccents = require('./replaceAccents');
var removeNonWord = require('./removeNonWord');
var upperCase = require('./upperCase');
var lowerCase = require('./lowerCase');
function camelCase(str) {
  str = toString(str);
  str = replaceAccents(str);
  str = removeNonWord(str).replace(/[\-_]/g, ' ').replace(/\s[a-z]/g, upperCase).replace(/\s+/g, '').replace(/^[A-Z]/g, lowerCase);
  return str;
}
module.exports = camelCase;
