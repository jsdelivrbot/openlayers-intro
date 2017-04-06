/* */ 
var randInt = require('./randInt');
var isArray = require('../lang/isArray');
function choice(items) {
  var target = (arguments.length === 1 && isArray(items)) ? items : arguments;
  return target[randInt(0, target.length - 1)];
}
module.exports = choice;
