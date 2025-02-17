/* */ 
var forEach = require('../array/forEach');
function namespace(obj, path) {
  if (!path)
    return obj;
  forEach(path.split('.'), function(key) {
    if (!obj[key]) {
      obj[key] = {};
    }
    obj = obj[key];
  });
  return obj;
}
module.exports = namespace;
