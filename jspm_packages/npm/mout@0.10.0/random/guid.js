/* */ 
var randHex = require('./randHex');
var choice = require('./choice');
function guid() {
  return (randHex(8) + '-' + randHex(4) + '-' + '4' + randHex(3) + '-' + choice(8, 9, 'a', 'b') + randHex(3) + '-' + randHex(12));
}
module.exports = guid;
