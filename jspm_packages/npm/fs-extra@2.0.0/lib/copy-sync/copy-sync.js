/* */ 
(function(process) {
  var fs = require('graceful-fs');
  var path = require('path');
  var copyFileSync = require('./copy-file-sync');
  var mkdir = require('../mkdirs/index');
  function copySync(src, dest, options) {
    if (typeof options === 'function' || options instanceof RegExp) {
      options = {filter: options};
    }
    options = options || {};
    options.recursive = !!options.recursive;
    options.clobber = 'clobber' in options ? !!options.clobber : true;
    options.overwrite = 'overwrite' in options ? !!options.overwrite : options.clobber;
    options.dereference = 'dereference' in options ? !!options.dereference : false;
    options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false;
    options.filter = options.filter || function() {
      return true;
    };
    if (options.preserveTimestamps && process.arch === 'ia32') {
      console.warn('fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n' + 'see https://github.com/jprichardson/node-fs-extra/issues/269');
    }
    var stats = (options.recursive && !options.dereference) ? fs.lstatSync(src) : fs.statSync(src);
    var destFolder = path.dirname(dest);
    var destFolderExists = fs.existsSync(destFolder);
    var performCopy = false;
    if (options.filter instanceof RegExp) {
      console.warn('Warning: fs-extra: Passing a RegExp filter is deprecated, use a function');
      performCopy = options.filter.test(src);
    } else if (typeof options.filter === 'function')
      performCopy = options.filter(src);
    if (stats.isFile() && performCopy) {
      if (!destFolderExists)
        mkdir.mkdirsSync(destFolder);
      copyFileSync(src, dest, {
        overwrite: options.overwrite,
        errorOnExist: options.errorOnExist,
        preserveTimestamps: options.preserveTimestamps
      });
    } else if (stats.isDirectory() && performCopy) {
      if (!fs.existsSync(dest))
        mkdir.mkdirsSync(dest);
      var contents = fs.readdirSync(src);
      contents.forEach(function(content) {
        var opts = options;
        opts.recursive = true;
        copySync(path.join(src, content), path.join(dest, content), opts);
      });
    } else if (options.recursive && stats.isSymbolicLink() && performCopy) {
      var srcPath = fs.readlinkSync(src);
      fs.symlinkSync(srcPath, dest);
    }
  }
  module.exports = copySync;
})(require('process'));
