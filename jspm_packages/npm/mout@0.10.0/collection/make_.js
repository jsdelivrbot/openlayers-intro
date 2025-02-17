/* */ 
var slice = require('../array/slice');
function makeCollectionMethod(arrMethod, objMethod, defaultReturn) {
  return function() {
    var args = slice(arguments);
    if (args[0] == null) {
      return defaultReturn;
    }
    return (typeof args[0].length === 'number') ? arrMethod.apply(null, args) : objMethod.apply(null, args);
  };
}
module.exports = makeCollectionMethod;
