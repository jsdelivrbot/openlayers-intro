/* */ 
var filter = require('./filter');
function isValidString(val) {
  return (val != null && val !== '');
}
function join(items, separator) {
  separator = separator || '';
  return filter(items, isValidString).join(separator);
}
module.exports = join;
