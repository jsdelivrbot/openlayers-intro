/* */ 
var toString = require('../lang/toString');
var lowerCase = require('./lowerCase');
var upperCase = require('./upperCase');
function sentenceCase(str) {
  str = toString(str);
  return lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, upperCase);
}
module.exports = sentenceCase;
