/* */ 
(function(process) {
  'use strict';
  var fs = require('fs');
  var path = require('path');
  var _ = require('lodash');
  var glob = require('glob');
  var minimatch = require('minimatch');
  var globule = exports;
  function processPatterns(patterns, options, fn) {
    var result = [];
    _.each(patterns, function(pattern) {
      if (pattern.indexOf('!') !== 0) {
        result = _.union(result, fn(pattern));
        return;
      }
      var filterFn = minimatch.filter(pattern.slice(1), options);
      result = _.filter(result, function(filepath) {
        return !filterFn(filepath);
      });
    });
    return result;
  }
  var pathSeparatorRe = /[\/\\]/g;
  function normalizePath(path) {
    return path.replace(pathSeparatorRe, '/');
  }
  globule.match = function(patterns, filepaths, options) {
    if (patterns == null || filepaths == null) {
      return [];
    }
    patterns = _.isArray(patterns) ? _.flattenDeep(patterns) : [patterns];
    filepaths = _.isArray(filepaths) ? _.flattenDeep(filepaths) : [filepaths];
    if (patterns.length === 0 || filepaths.length === 0) {
      return [];
    }
    return processPatterns(patterns, options, function(pattern) {
      return minimatch.match(filepaths, pattern, options || {});
    });
  };
  globule.isMatch = function() {
    return globule.match.apply(null, arguments).length > 0;
  };
  globule.find = function() {
    var args = _.toArray(arguments);
    var options = _.isPlainObject(args[args.length - 1]) ? args.pop() : {};
    var patterns;
    if (options.src) {
      patterns = _.isArray(options.src) ? _.flattenDeep(options.src) : [options.src];
    } else {
      patterns = _.flattenDeep(args);
    }
    if (patterns.length === 0) {
      return [];
    }
    var srcBase = options.srcBase || options.cwd;
    var globOptions = _.extend({}, options);
    if (srcBase) {
      globOptions.cwd = srcBase;
    }
    var matches = processPatterns(patterns, options, function(pattern) {
      return glob.sync(pattern, globOptions);
    });
    if (srcBase && options.prefixBase) {
      matches = matches.map(function(filepath) {
        return normalizePath(path.join(srcBase, filepath));
      });
    }
    if (options.filter) {
      matches = matches.filter(function(filepath) {
        if (srcBase && !options.prefixBase) {
          filepath = normalizePath(path.join(srcBase, filepath));
        }
        try {
          if (_.isFunction(options.filter)) {
            return options.filter(filepath, options);
          } else {
            return fs.statSync(filepath)[options.filter]();
          }
        } catch (err) {
          return false;
        }
      });
    }
    return matches;
  };
  var extDotRe = {
    first: /(\.[^\/]*)?$/,
    last: /(\.[^\/\.]*)?$/
  };
  function rename(dest, options) {
    if (options.flatten) {
      dest = path.basename(dest);
    }
    if (options.ext) {
      dest = dest.replace(extDotRe[options.extDot], options.ext);
    }
    if (options.destBase) {
      dest = path.join(options.destBase, dest);
    }
    return dest;
  }
  globule.mapping = function(filepaths, options) {
    if (filepaths == null) {
      return [];
    }
    options = _.defaults({}, options, {
      extDot: 'first',
      rename: rename
    });
    var files = [];
    var fileByDest = {};
    filepaths.forEach(function(src) {
      var dest = options.rename(src, options);
      if (options.srcBase) {
        src = path.join(options.srcBase, src);
      }
      dest = normalizePath(dest);
      src = normalizePath(src);
      if (fileByDest[dest]) {
        fileByDest[dest].src.push(src);
      } else {
        files.push({
          src: [src],
          dest: dest
        });
        fileByDest[dest] = files[files.length - 1];
      }
    });
    return files;
  };
  globule.findMapping = function() {
    var args = _.toArray(arguments);
    var options = _.isPlainObject(args[args.length - 1]) ? args.pop() : {};
    return globule.mapping(globule.find(args, options), options);
  };
})(require('process'));
