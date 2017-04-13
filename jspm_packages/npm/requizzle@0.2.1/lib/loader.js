/* */ 
'use strict';
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var Module = require('module');
var originalWrapper = Module.wrapper.slice(0);
var requizzleWrappers = {
  extras: require('./wrappers/extras'),
  requirePaths: require('./wrappers/requirepaths'),
  strict: require('./wrappers/strict')
};
function wrap(wrappers, script) {
  return wrappers[0] + script + wrappers[1];
}
function replaceWrapper(wrapperObj) {
  var joiner = '\n';
  var before = wrapperObj.before.join(joiner);
  var after = wrapperObj.after.join(joiner);
  var wrappers = [originalWrapper[0] + before, after + originalWrapper[1]];
  Module.wrap = wrap.bind(null, wrappers);
}
function restoreWrapper() {
  Module.wrap = wrap.bind(null, originalWrapper);
}
function createModule(targetPath, parentModule, moduleCache) {
  moduleCache[targetPath] = moduleCache[targetPath] || new Module(targetPath, parentModule);
  return moduleCache[targetPath];
}
function requireProxy(targetModule, nodeRequire, filepath) {
  restoreWrapper();
  targetModule.require = nodeRequire;
  return nodeRequire.call(targetModule, filepath);
}
function infectProxy(targetModule, cache, opts, filepath) {
  var moduleExports;
  var Requizzle = require('./requizzle');
  var requizzle;
  opts = _.clone(opts);
  opts.parent = targetModule;
  requizzle = new Requizzle(opts, cache);
  moduleExports = requizzle.requizzle(filepath);
  return moduleExports;
}
var load = exports.load = function load(targetPath, parentModule, wrapper, cache, options) {
  var nodeRequire;
  var targetModule;
  if (cache.module[targetPath]) {
    return cache.module[targetPath];
  }
  targetModule = createModule(targetPath, parentModule, cache.module);
  nodeRequire = targetModule.require;
  if (options.infect) {
    targetModule.require = function(filepath) {
      return infectProxy(targetModule, cache, options, filepath);
    };
  } else {
    targetModule.require = function(filepath) {
      return requireProxy(targetModule, nodeRequire, filepath);
    };
  }
  replaceWrapper(wrapper);
  targetModule.load(targetModule.id);
  restoreWrapper();
  return targetModule;
};
function detectStrictMode(src) {
  return (/^\s*(?:["']use strict["'])[ \t]*(?:[\r\n]|;)/g).test(src);
}
function loadSource(targetPath, sourceCache) {
  if (sourceCache[targetPath] === undefined) {
    sourceCache[targetPath] = fs.readFileSync(targetPath, 'utf8');
  }
  return sourceCache[targetPath];
}
exports.createWrapper = function createWrapper(targetPath, parentModule, cache, options) {
  var src;
  var wrapperObject = {
    before: [],
    after: []
  };
  function add(wrapperFunctions, opts) {
    var params = [targetPath, parentModule, opts];
    ['before', 'after'].forEach(function(item) {
      var result = wrapperFunctions[item].apply(null, params);
      if (result) {
        wrapperObject[item].push(result);
      }
    });
  }
  src = loadSource(targetPath, cache.source);
  if (detectStrictMode(src) === true) {
    add(requizzleWrappers.strict);
  }
  if (options.requirePaths) {
    add(requizzleWrappers.requirePaths, options.requirePaths);
  }
  if (options.extras) {
    add(requizzleWrappers.extras, options.extras);
  }
  return wrapperObject;
};
