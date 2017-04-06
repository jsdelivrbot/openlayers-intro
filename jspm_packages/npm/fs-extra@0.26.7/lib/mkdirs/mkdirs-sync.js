/* */ 
(function(process) {
  var fs = require('graceful-fs');
  var path = require('path');
  var o777 = parseInt('0777', 8);
  function mkdirsSync(p, opts, made) {
    if (!opts || typeof opts !== 'object') {
      opts = {mode: opts};
    }
    var mode = opts.mode;
    var xfs = opts.fs || fs;
    if (mode === undefined) {
      mode = o777 & (~process.umask());
    }
    if (!made)
      made = null;
    p = path.resolve(p);
    try {
      xfs.mkdirSync(p, mode);
      made = made || p;
    } catch (err0) {
      switch (err0.code) {
        case 'ENOENT':
          made = mkdirsSync(path.dirname(p), opts, made);
          mkdirsSync(p, opts, made);
          break;
        default:
          var stat;
          try {
            stat = xfs.statSync(p);
          } catch (err1) {
            throw err0;
          }
          if (!stat.isDirectory())
            throw err0;
          break;
      }
    }
    return made;
  }
  module.exports = mkdirsSync;
})(require('process'));
