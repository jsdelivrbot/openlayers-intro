/* */ 
var map = require('./map');
function pluck(arr, propName) {
  return map(arr, propName);
}
module.exports = pluck;
