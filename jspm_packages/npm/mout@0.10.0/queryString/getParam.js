/* */ 
var typecast = require('../string/typecast');
var getQuery = require('./getQuery');
function getParam(url, param, shouldTypecast) {
  var regexp = new RegExp('(\\?|&)' + param + '=([^&]*)'),
      result = regexp.exec(getQuery(url)),
      val = (result && result[2]) ? result[2] : null;
  return shouldTypecast === false ? val : typecast(val);
}
module.exports = getParam;
