/* */ 
var toInt = require('./toInt');
var nth = require('./nth');
function ordinal(n) {
  n = toInt(n);
  return n + nth(n);
}
module.exports = ordinal;
