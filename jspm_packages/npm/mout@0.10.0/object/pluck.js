/* */ 
var map = require('./map');
var prop = require('../function/prop');
function pluck(obj, propName) {
  return map(obj, prop(propName));
}
module.exports = pluck;
