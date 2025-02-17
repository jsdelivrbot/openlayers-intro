/* */ 
'use strict';
var assign = require('../object/assign/index'),
    captureStackTrace = Error.captureStackTrace;
exports = module.exports = function(message) {
  var err = new Error(message),
      code = arguments[1],
      ext = arguments[2];
  if (ext == null) {
    if (code && (typeof code === 'object')) {
      ext = code;
      code = null;
    }
  }
  if (ext != null)
    assign(err, ext);
  if (code != null)
    err.code = String(code);
  if (captureStackTrace)
    captureStackTrace(err, exports);
  return err;
};
