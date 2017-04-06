/* */ 
var getQuery = require('./getQuery');
function contains(url, paramName) {
  var regex = new RegExp('(\\?|&)' + paramName + '=', 'g');
  return regex.test(getQuery(url));
}
module.exports = contains;
