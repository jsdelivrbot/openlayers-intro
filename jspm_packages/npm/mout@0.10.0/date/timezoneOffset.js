/* */ 
var pad = require('../number/pad');
function timezoneOffset(date) {
  var offset = date.getTimezoneOffset();
  var abs = Math.abs(offset);
  var h = pad(Math.floor(abs / 60), 2);
  var m = pad(abs % 60, 2);
  return (offset > 0 ? '-' : '+') + h + m;
}
module.exports = timezoneOffset;
