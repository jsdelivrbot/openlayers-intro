/* */ 
(function(process) {
  var stream = require('stream');
  if (!stream.Readable) {
    var stream = require('readable-stream');
  }
  var fs = require('graceful-fs');
  var Q = require('q');
  var path = require('path');
  var zlib = require('zlib');
  var touch = Q.denodeify(require('touch'));
  var mkpath = Q.denodeify(require('mkpath'));
  var writeFile = Q.denodeify(fs.writeFile);
  var inflateRaw = Q.denodeify(zlib.inflateRaw);
  var symlink = Q.denodeify(fs.symlink);
  var stat = Q.denodeify(fs.stat);
  var mkdir = function(dir, cache, mode) {
    dir = path.normalize(path.resolve(process.cwd(), dir) + path.sep);
    if (mode === undefined) {
      mode = parseInt('777', 8) & (~process.umask());
    }
    if (!cache[dir]) {
      var parent;
      if (fs.existsSync(dir)) {
        parent = new Q();
      } else {
        parent = mkdir(path.dirname(dir), cache, mode);
      }
      cache[dir] = parent.then(function() {
        return mkpath(dir, mode);
      });
    }
    return cache[dir];
  };
  var extractors = {
    folder: function(folder, destination, zip) {
      return mkdir(destination, zip.dirCache, folder.mode).then(function() {
        return {folder: folder.path};
      });
    },
    store: function(file, destination, zip) {
      var writer;
      if (file.uncompressedSize === 0) {
        writer = touch.bind(null, destination);
      } else if (file.uncompressedSize <= zip.chunkSize) {
        writer = function() {
          return zip.getBuffer(file._offset, file._offset + file.uncompressedSize).then(function(buffer) {
            return writeFile(destination, buffer, {mode: file.mode});
          });
        };
      } else {
        var input = new stream.Readable();
        input.wrap(fs.createReadStream(zip.filename, {
          start: file._offset,
          end: file._offset + file.uncompressedSize - 1
        }));
        writer = pipePromise.bind(null, input, destination, {mode: file.mode});
      }
      return mkdir(path.dirname(destination), zip.dirCache).then(writer).then(function() {
        return {stored: file.path};
      });
    },
    deflate: function(file, destination, zip) {
      return mkdir(path.dirname(destination), zip.dirCache).then(function() {
        if (file._maxSize <= zip.chunkSize) {
          return zip.getBuffer(file._offset, file._offset + file._maxSize).then(inflateRaw).then(function(buffer) {
            return writeFile(destination, buffer, {mode: file.mode});
          });
        } else {
          var input = new stream.Readable();
          input.wrap(fs.createReadStream(zip.filename, {start: file._offset}));
          var inflater = input.pipe(zlib.createInflateRaw({highWaterMark: 32 * 1024}));
          return pipePromise(inflater, destination, {mode: file.mode});
        }
      }).then(function() {
        return {deflated: file.path};
      });
    },
    symlink: function(file, destination, zip, basePath) {
      var parent = path.dirname(destination);
      return mkdir(parent, zip.dirCache).then(function() {
        return getLinkLocation(file, destination, zip, basePath);
      }).then(function(linkTo) {
        return symlink(path.resolve(parent, linkTo), destination).then(function() {
          return {
            symlink: file.path,
            linkTo: linkTo
          };
        });
      });
    },
    copy: function(file, destination, zip, basePath) {
      var type;
      var parent = path.dirname(destination);
      return mkdir(parent, zip.dirCache).then(function() {
        return getLinkLocation(file, destination, zip, basePath);
      }).then(function(linkTo) {
        return stat(path.resolve(parent, linkTo)).then(function(stats) {
          if (stats.isFile()) {
            type = 'File';
            var input = new stream.Readable();
            input.wrap(fs.createReadStream(path.resolve(parent, linkTo)));
            return pipePromise(input, destination);
          } else if (stats.isDirectory()) {
            type = 'Directory';
            return mkdir(destination, zip.dirCache);
          } else {
            throw new Error('Could not follow symlink to unknown file type');
          }
        }).then(function() {
          return {
            copy: file.path,
            original: linkTo,
            type: type
          };
        });
      });
    }
  };
  var getLinkLocation = function(file, destination, zip, basePath) {
    var parent = path.dirname(destination);
    return zip.getBuffer(file._offset, file._offset + file.uncompressedSize).then(function(buffer) {
      var linkTo = buffer.toString();
      var fullLink = path.resolve(parent, linkTo);
      if (path.relative(basePath, fullLink).slice(0, 2) === '..') {
        throw new Error('Symlink links outside archive');
      }
      return linkTo;
    });
  };
  var pipePromise = function(input, destination, options) {
    var deferred = Q.defer();
    var output = fs.createWriteStream(destination, options);
    var errorHandler = function(error) {
      deferred.reject(error);
    };
    input.on('error', errorHandler);
    output.on('error', errorHandler);
    input.on('end', function() {
      output.end(function() {
        deferred.resolve();
      });
    });
    input.pipe(output, {end: false});
    return deferred.promise;
  };
  module.exports = extractors;
})(require('process'));
