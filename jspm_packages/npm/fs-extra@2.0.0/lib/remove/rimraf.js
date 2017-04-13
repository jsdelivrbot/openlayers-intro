/* */ 
(function(process) {
  module.exports = rimraf;
  rimraf.sync = rimrafSync;
  var assert = require('assert');
  var path = require('path');
  var fs = require('graceful-fs');
  var isWindows = (process.platform === 'win32');
  function defaults(options) {
    var methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'];
    methods.forEach(function(m) {
      options[m] = options[m] || fs[m];
      m = m + 'Sync';
      options[m] = options[m] || fs[m];
    });
    options.maxBusyTries = options.maxBusyTries || 3;
  }
  function rimraf(p, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    assert(p, 'rimraf: missing path');
    assert.equal(typeof p, 'string', 'rimraf: path should be a string');
    assert.equal(typeof cb, 'function', 'rimraf: callback function required');
    assert(options, 'rimraf: invalid options argument provided');
    assert.equal(typeof options, 'object', 'rimraf: options should be object');
    defaults(options);
    var busyTries = 0;
    rimraf_(p, options, function CB(er) {
      if (er) {
        if (isWindows && (er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') && busyTries < options.maxBusyTries) {
          busyTries++;
          var time = busyTries * 100;
          return setTimeout(function() {
            rimraf_(p, options, CB);
          }, time);
        }
        if (er.code === 'ENOENT')
          er = null;
      }
      cb(er);
    });
  }
  function rimraf_(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');
    options.lstat(p, function(er, st) {
      if (er && er.code === 'ENOENT') {
        return cb(null);
      }
      if (er && er.code === 'EPERM' && isWindows) {
        fixWinEPERM(p, options, er, cb);
      }
      if (st && st.isDirectory()) {
        return rmdir(p, options, er, cb);
      }
      options.unlink(p, function(er) {
        if (er) {
          if (er.code === 'ENOENT') {
            return cb(null);
          }
          if (er.code === 'EPERM') {
            return (isWindows) ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
          }
          if (er.code === 'EISDIR') {
            return rmdir(p, options, er, cb);
          }
        }
        return cb(er);
      });
    });
  }
  function fixWinEPERM(p, options, er, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');
    if (er) {
      assert(er instanceof Error);
    }
    options.chmod(p, 666, function(er2) {
      if (er2) {
        cb(er2.code === 'ENOENT' ? null : er);
      } else {
        options.stat(p, function(er3, stats) {
          if (er3) {
            cb(er3.code === 'ENOENT' ? null : er);
          } else if (stats.isDirectory()) {
            rmdir(p, options, er, cb);
          } else {
            options.unlink(p, cb);
          }
        });
      }
    });
  }
  function fixWinEPERMSync(p, options, er) {
    assert(p);
    assert(options);
    if (er) {
      assert(er instanceof Error);
    }
    try {
      options.chmodSync(p, 666);
    } catch (er2) {
      if (er2.code === 'ENOENT') {
        return;
      } else {
        throw er;
      }
    }
    try {
      var stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === 'ENOENT') {
        return;
      } else {
        throw er;
      }
    }
    if (stats.isDirectory()) {
      rmdirSync(p, options, er);
    } else {
      options.unlinkSync(p);
    }
  }
  function rmdir(p, options, originalEr, cb) {
    assert(p);
    assert(options);
    if (originalEr) {
      assert(originalEr instanceof Error);
    }
    assert(typeof cb === 'function');
    options.rmdir(p, function(er) {
      if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
        rmkids(p, options, cb);
      } else if (er && er.code === 'ENOTDIR') {
        cb(originalEr);
      } else {
        cb(er);
      }
    });
  }
  function rmkids(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');
    options.readdir(p, function(er, files) {
      if (er) {
        return cb(er);
      }
      var n = files.length;
      if (n === 0) {
        return options.rmdir(p, cb);
      }
      var errState;
      files.forEach(function(f) {
        rimraf(path.join(p, f), options, function(er) {
          if (errState) {
            return;
          }
          if (er) {
            return cb(errState = er);
          }
          if (--n === 0) {
            options.rmdir(p, cb);
          }
        });
      });
    });
  }
  function rimrafSync(p, options) {
    options = options || {};
    defaults(options);
    assert(p, 'rimraf: missing path');
    assert.equal(typeof p, 'string', 'rimraf: path should be a string');
    assert(options, 'rimraf: missing options');
    assert.equal(typeof options, 'object', 'rimraf: options should be object');
    try {
      var st = options.lstatSync(p);
    } catch (er) {
      if (er.code === 'ENOENT') {
        return;
      }
      if (er.code === 'EPERM' && isWindows) {
        fixWinEPERMSync(p, options, er);
      }
    }
    try {
      if (st && st.isDirectory()) {
        rmdirSync(p, options, null);
      } else {
        options.unlinkSync(p);
      }
    } catch (er) {
      if (er.code === 'ENOENT') {
        return;
      }
      if (er.code === 'EPERM') {
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
      }
      if (er.code !== 'EISDIR') {
        throw er;
      }
      rmdirSync(p, options, er);
    }
  }
  function rmdirSync(p, options, originalEr) {
    assert(p);
    assert(options);
    if (originalEr) {
      assert(originalEr instanceof Error);
    }
    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === 'ENOENT') {
        return;
      }
      if (er.code === 'ENOTDIR') {
        throw originalEr;
      }
      if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
        rmkidsSync(p, options);
      }
    }
  }
  function rmkidsSync(p, options) {
    assert(p);
    assert(options);
    options.readdirSync(p).forEach(function(f) {
      rimrafSync(path.join(p, f), options);
    });
    options.rmdirSync(p, options);
  }
})(require('process'));
