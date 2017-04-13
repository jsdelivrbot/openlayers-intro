/* */ 
(function(process) {
  var EventEmitter = require('events').EventEmitter;
  var parse = require('url').parse;
  var path = require('path');
  var Q = require('q');
  var tmp = require('tmp');
  var download = require('./bower-util/download');
  var extract = require('./bower-util/extract');
  var misc = require('./misc');
  tmp.setGracefulCleanup();
  module.exports = function(url, options) {
    options = options || {};
    var dest = options.dest || process.cwd();
    delete options.dest;
    var extractArchive = !!options.extract;
    delete options.extract;
    var emitter = new EventEmitter();
    var pathname = parse(url).pathname;
    var promise;
    if (extractArchive) {
      promise = misc.existingDirectory(dest);
    } else {
      promise = misc.resolveFilePath(dest, path.basename(pathname));
    }
    promise.then(function(destPath) {
      var tmpOptions = {postfix: path.extname(pathname)};
      return Q.nfcall(tmp.file, tmpOptions).then(function(args) {
        var tmpFile = args[0];
        return download(url, tmpFile, options).then(function(response) {
          if (extractArchive) {
            var contentType = response.headers['content-type'];
            return extract(tmpFile, destPath, {mimeType: contentType});
          } else {
            return misc.copy(tmpFile, destPath);
          }
        });
      });
    }).progress(function(state) {
      emitter.emit('progress', state);
    }).then(function(dest) {
      emitter.emit('end', dest);
    }).fail(function(err) {
      emitter.emit('error', err);
    });
    return emitter;
  };
})(require('process'));
