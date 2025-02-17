/* */ 
var namespace = require('./namespace');
function set(obj, prop, val) {
  var parts = (/^(.+)\.(.+)$/).exec(prop);
  if (parts) {
    namespace(obj, parts[1])[parts[2]] = val;
  } else {
    obj[prop] = val;
  }
}
module.exports = set;
