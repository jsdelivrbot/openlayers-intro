/* */ 
var arrMax = require('../array/max');
var values = require('./values');
function max(obj, compareFn) {
  return arrMax(values(obj), compareFn);
}
module.exports = max;
