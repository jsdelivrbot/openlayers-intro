/* */ 
var toString = require('../lang/toString');
var WHITE_SPACES = require('./WHITE_SPACES');
var ltrim = require('./ltrim');
var rtrim = require('./rtrim');
function trim(str, chars) {
  str = toString(str);
  chars = chars || WHITE_SPACES;
  return ltrim(rtrim(str, chars), chars);
}
module.exports = trim;
