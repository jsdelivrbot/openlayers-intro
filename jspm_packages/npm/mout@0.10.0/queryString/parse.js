/* */ 
var decode = require('./decode');
var getQuery = require('./getQuery');
function parse(url, shouldTypecast) {
  return decode(getQuery(url), shouldTypecast);
}
module.exports = parse;
