/* */ 
(function(process) {
  var fs = require('fs'),
      path = require('path'),
      os = require('os'),
      crypto = require('crypto'),
      exists = fs.exists || path.exists,
      existsSync = fs.existsSync || path.existsSync,
      tmpDir = require('os-tmpdir'),
      _c = require('constants');
  var _TMP = tmpDir(),
      RANDOM_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      TEMPLATE_PATTERN = /XXXXXX/,
      DEFAULT_TRIES = 3,
      CREATE_FLAGS = _c.O_CREAT | _c.O_EXCL | _c.O_RDWR,
      DIR_MODE = 448,
      FILE_MODE = 384,
      _removeObjects = [],
      _gracefulCleanup = false,
      _uncaughtException = false;
  function _randomChars(howMany) {
    var value = [],
        rnd = null;
    try {
      rnd = crypto.randomBytes(howMany);
    } catch (e) {
      rnd = crypto.pseudoRandomBytes(howMany);
    }
    for (var i = 0; i < howMany; i++) {
      value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
    }
    return value.join('');
  }
  function _isUndefined(obj) {
    return typeof obj === 'undefined';
  }
  function _parseArguments(options, callback) {
    if (typeof options == 'function') {
      var tmp = options;
      options = callback || {};
      callback = tmp;
    } else if (typeof options == 'undefined') {
      options = {};
    }
    return [options, callback];
  }
  function _generateTmpName(opts) {
    if (opts.name) {
      return path.join(opts.dir || _TMP, opts.name);
    }
    if (opts.template) {
      return opts.template.replace(TEMPLATE_PATTERN, _randomChars(6));
    }
    var name = [opts.prefix || 'tmp-', process.pid, _randomChars(12), opts.postfix || ''].join('');
    return path.join(opts.dir || _TMP, name);
  }
  function _getTmpName(options, callback) {
    var args = _parseArguments(options, callback),
        opts = args[0],
        cb = args[1],
        tries = opts.tries || DEFAULT_TRIES;
    if (isNaN(tries) || tries < 0)
      return cb(new Error('Invalid tries'));
    if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
      return cb(new Error('Invalid template provided'));
    (function _getUniqueName() {
      var name = _generateTmpName(opts);
      exists(name, function _pathExists(pathExists) {
        if (pathExists) {
          if (tries-- > 0)
            return _getUniqueName();
          return cb(new Error('Could not get a unique tmp filename, max tries reached ' + name));
        }
        cb(null, name);
      });
    }());
  }
  function _getTmpNameSync(options) {
    var args = _parseArguments(options),
        opts = args[0],
        tries = opts.tries || DEFAULT_TRIES;
    if (isNaN(tries) || tries < 0)
      throw new Error('Invalid tries');
    if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
      throw new Error('Invalid template provided');
    do {
      var name = _generateTmpName(opts);
      if (!existsSync(name)) {
        return name;
      }
    } while (tries-- > 0);
    throw new Error('Could not get a unique tmp filename, max tries reached');
  }
  function _createTmpFile(options, callback) {
    var args = _parseArguments(options, callback),
        opts = args[0],
        cb = args[1];
    opts.postfix = (_isUndefined(opts.postfix)) ? '.tmp' : opts.postfix;
    _getTmpName(opts, function _tmpNameCreated(err, name) {
      if (err)
        return cb(err);
      fs.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err, fd) {
        if (err)
          return cb(err);
        cb(null, name, fd, _prepareTmpFileRemoveCallback(name, fd, opts));
      });
    });
  }
  function _createTmpFileSync(options) {
    var args = _parseArguments(options),
        opts = args[0];
    opts.postfix = opts.postfix || '.tmp';
    var name = _getTmpNameSync(opts);
    var fd = fs.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
    return {
      name: name,
      fd: fd,
      removeCallback: _prepareTmpFileRemoveCallback(name, fd, opts)
    };
  }
  function _rmdirRecursiveSync(root) {
    var dirs = [root];
    do {
      var dir = dirs.pop(),
          canRemove = true,
          files = fs.readdirSync(dir);
      for (var i = 0,
          length = files.length; i < length; i++) {
        var file = path.join(dir, files[i]),
            stat = fs.lstatSync(file);
        if (stat.isDirectory()) {
          canRemove = false;
          dirs.push(dir);
          dirs.push(file);
        } else {
          fs.unlinkSync(file);
        }
      }
      if (canRemove) {
        fs.rmdirSync(dir);
      }
    } while (dirs.length !== 0);
  }
  function _createTmpDir(options, callback) {
    var args = _parseArguments(options, callback),
        opts = args[0],
        cb = args[1];
    _getTmpName(opts, function _tmpNameCreated(err, name) {
      if (err)
        return cb(err);
      fs.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err) {
        if (err)
          return cb(err);
        cb(null, name, _prepareTmpDirRemoveCallback(name, opts));
      });
    });
  }
  function _createTmpDirSync(options) {
    var args = _parseArguments(options),
        opts = args[0];
    var name = _getTmpNameSync(opts);
    fs.mkdirSync(name, opts.mode || DIR_MODE);
    return {
      name: name,
      removeCallback: _prepareTmpDirRemoveCallback(name, opts)
    };
  }
  function _prepareTmpFileRemoveCallback(name, fd, opts) {
    var removeCallback = _prepareRemoveCallback(function _removeCallback(fdPath) {
      try {
        fs.closeSync(fdPath[0]);
      } catch (e) {
        if (e.errno != -_c.EBADF && e.errno != -c.ENOENT) {
          throw e;
        }
      }
      fs.unlinkSync(fdPath[1]);
    }, [fd, name]);
    if (!opts.keep) {
      _removeObjects.unshift(removeCallback);
    }
    return removeCallback;
  }
  function _prepareTmpDirRemoveCallback(name, opts) {
    var removeFunction = opts.unsafeCleanup ? _rmdirRecursiveSync : fs.rmdirSync.bind(fs);
    var removeCallback = _prepareRemoveCallback(removeFunction, name);
    if (!opts.keep) {
      _removeObjects.unshift(removeCallback);
    }
    return removeCallback;
  }
  function _prepareRemoveCallback(removeFunction, arg) {
    var called = false;
    return function _cleanupCallback() {
      if (called)
        return;
      var index = _removeObjects.indexOf(removeFunction);
      if (index >= 0) {
        _removeObjects.splice(index, 1);
      }
      called = true;
      removeFunction(arg);
    };
  }
  function _garbageCollector() {
    if (_uncaughtException && !_gracefulCleanup) {
      return;
    }
    for (var i = 0,
        length = _removeObjects.length; i < length; i++) {
      try {
        _removeObjects[i].call(null);
      } catch (e) {}
    }
  }
  function _setGracefulCleanup() {
    _gracefulCleanup = true;
  }
  var version = process.versions.node.split('.').map(function(value) {
    return parseInt(value, 10);
  });
  if (version[0] === 0 && (version[1] < 9 || version[1] === 9 && version[2] < 5)) {
    process.addListener('uncaughtException', function _uncaughtExceptionThrown(err) {
      _uncaughtException = true;
      _garbageCollector();
      throw err;
    });
  }
  process.addListener('exit', function _exit(code) {
    if (code)
      _uncaughtException = true;
    _garbageCollector();
  });
  module.exports.tmpdir = _TMP;
  module.exports.dir = _createTmpDir;
  module.exports.dirSync = _createTmpDirSync;
  module.exports.file = _createTmpFile;
  module.exports.fileSync = _createTmpFileSync;
  module.exports.tmpName = _getTmpName;
  module.exports.tmpNameSync = _getTmpNameSync;
  module.exports.setGracefulCleanup = _setGracefulCleanup;
})(require('process'));
