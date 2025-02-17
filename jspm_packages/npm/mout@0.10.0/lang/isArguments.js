/* */ 
var isKind = require('./isKind');
var isArgs = isKind(arguments, 'Arguments') ? function(val) {
  return isKind(val, 'Arguments');
} : function(val) {
  return !!(val && Object.prototype.hasOwnProperty.call(val, 'callee'));
};
module.exports = isArgs;
