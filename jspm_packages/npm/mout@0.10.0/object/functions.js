/* */ 
var forIn = require('./forIn');
function functions(obj) {
  var keys = [];
  forIn(obj, function(val, key) {
    if (typeof val === 'function') {
      keys.push(key);
    }
  });
  return keys.sort();
}
module.exports = functions;
