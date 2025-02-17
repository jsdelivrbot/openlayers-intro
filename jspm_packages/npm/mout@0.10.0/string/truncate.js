/* */ 
var toString = require('../lang/toString');
var trim = require('./trim');
function truncate(str, maxChars, append, onlyFullWords) {
  str = toString(str);
  append = append || '...';
  maxChars = onlyFullWords ? maxChars + 1 : maxChars;
  str = trim(str);
  if (str.length <= maxChars) {
    return str;
  }
  str = str.substr(0, maxChars - append.length);
  str = onlyFullWords ? str.substr(0, str.lastIndexOf(' ')) : trim(str);
  return str + append;
}
module.exports = truncate;
