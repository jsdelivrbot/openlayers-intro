/* */ 
'use strict';
var _ = require('underscore');
var loader = require('./loader');
var Module = require('module');
var path = require('path');
function isNativeModule(targetPath, parentModule) {
  var lookupPaths = Module._resolveLookupPaths(targetPath, parentModule);
  if (lookupPaths[0] === targetPath && lookupPaths[1].length === 0) {
    return true;
  }
  return false;
}
function Requizzle(options, cache) {
  this._options = options;
  this._cache = cache || {
    module: {},
    source: {}
  };
}
Requizzle.prototype.requizzle = function requizzle(targetPath) {
  var options = this._options;
  var parentModule = options.parent;
  var targetModule;
  var wrapper;
  if (isNativeModule(targetPath, parentModule)) {
    return require(targetPath);
  }
  targetPath = Module._resolveFilename(targetPath, parentModule);
  wrapper = loader.createWrapper(targetPath, parentModule, this._cache, this._options);
  targetModule = loader.load(targetPath, parentModule, wrapper, this._cache, this._options);
  return targetModule.exports;
};
module.exports = Requizzle;
