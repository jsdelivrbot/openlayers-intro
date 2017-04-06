/* */ 
(function(process) {
  var fs = require('fs');
  var path = require('path');
  var Q = require('q');
  exports.copy = function(src, dest) {
    var deferred = Q.defer();
    var read = fs.createReadStream(src);
    read.on('error', deferred.reject);
    var write = fs.createWriteStream(dest, {flags: 'wx'});
    write.on('error', function(err) {
      process.nextTick(function() {
        deferred.reject(err);
      });
    });
    write.on('close', deferred.resolve.bind(deferred, dest));
    read.pipe(write);
    return deferred.promise;
  };
  exports.existingDirectory = function(dir) {
    var deferred = Q.defer();
    fs.stat(dir, function(err, stats) {
      if (err || !stats.isDirectory()) {
        deferred.reject(new Error('Not a directory: ' + dir));
      } else {
        deferred.resolve(dir);
      }
    });
    return deferred.promise;
  };
  exports.resolveFilePath = function(dirOrFile, basename) {
    var deferred = Q.defer();
    fs.stat(dirOrFile, function(err, stats) {
      if (err) {
        if (err.code !== 'ENOENT') {
          deferred.reject(err);
        } else {
          fs.stat(path.dirname(dirOrFile), function(err2, stats) {
            if (err2 || !stats.isDirectory()) {
              deferred.reject(err);
            } else {
              deferred.resolve(dirOrFile);
            }
          });
        }
      } else if (!stats.isDirectory()) {
        deferred.reject(new Error('Not a directory: ' + dirOrFile));
      } else {
        deferred.resolve(path.join(dirOrFile, basename));
      }
    });
    return deferred.promise;
  };
})(require('process'));
