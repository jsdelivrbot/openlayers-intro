/* */ 
var forOwn = require('./forOwn');
function size(obj) {
  var count = 0;
  forOwn(obj, function() {
    count++;
  });
  return count;
}
module.exports = size;
