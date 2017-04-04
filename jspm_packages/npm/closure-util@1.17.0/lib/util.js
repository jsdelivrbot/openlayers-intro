/* */ 
(function(process) {
  var crypto = require('crypto');
  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');
  var minimatch = require('minimatch');
  var async = require('async');
  var lo = require('lodash');
  var config = require('./config');
  exports.like = function like(obj, test) {
    var is = false;
    if (test === '*') {
      is = obj !== undefined;
    } else if (Array.isArray(test)) {
      if (Array.isArray(obj) && test.length === obj.length) {
        is = test.every(function(t, i) {
          return like(obj[i], t);
        });
      }
    } else {
      is = Object.is(obj, test);
      if (!is && typeof test === 'object' && typeof obj === 'object' && obj !== null) {
        var testKeys = Object.keys(test).sort();
        if (like(Object.keys(obj).sort(), testKeys)) {
          is = testKeys.every(function(key) {
            return like(obj[key], test[key]);
          });
        }
      }
    }
    return is;
  };
  exports.globs = function(patterns, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!Array.isArray(patterns)) {
      patterns = [patterns];
    }
    async.map(patterns, function(pattern, cb) {
      glob(pattern, options, cb);
    }, function(err, results) {
      if (err) {
        return callback(err);
      }
      var cwd = options.cwd || process.cwd();
      async.filter(lo.uniq(lo.flatten(results)), function(file, include) {
        fs.stat(path.resolve(cwd, file), function(err, stats) {
          include(err, stats && !stats.isDirectory());
        });
      }, function(err, filtered) {
        callback(err, filtered);
      });
    });
  };
  exports.minimatches = function(str, patterns) {
    return patterns.some(function(pattern) {
      return minimatch(str, pattern);
    });
  };
  var getDependency = function(alias, url) {
    var base = path.join(__dirname, '..', '.deps', alias);
    var hash = crypto.createHash('sha1');
    hash.update(url, 'utf8');
    return path.join(base, hash.digest('hex'));
  };
  exports.getDependency = getDependency;
  exports.getLibraryPath = function() {
    return getDependency('library', config.get('library_url'));
  };
  exports.getCompilerPath = function() {
    return getDependency('compiler', config.get('compiler_url'));
  };
})(require('process'));
