/* */ 
var hasOwn = require('./hasOwn');
var _hasDontEnumBug,
    _dontEnums;
function checkDontEnum() {
  _dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
  _hasDontEnumBug = true;
  for (var key in {'toString': null}) {
    _hasDontEnumBug = false;
  }
}
function forIn(obj, fn, thisObj) {
  var key,
      i = 0;
  if (_hasDontEnumBug == null)
    checkDontEnum();
  for (key in obj) {
    if (exec(fn, obj, key, thisObj) === false) {
      break;
    }
  }
  if (_hasDontEnumBug) {
    var ctor = obj.constructor,
        isProto = !!ctor && obj === ctor.prototype;
    while (key = _dontEnums[i++]) {
      if ((key !== 'constructor' || (!isProto && hasOwn(obj, key))) && obj[key] !== Object.prototype[key]) {
        if (exec(fn, obj, key, thisObj) === false) {
          break;
        }
      }
    }
  }
}
function exec(fn, obj, key, thisObj) {
  return fn.call(thisObj, obj[key], key, obj);
}
module.exports = forIn;
