/* */ 
'use strict';
var fs = require('fs'),
    join = require('path').join,
    resolve = require('path').resolve,
    dirname = require('path').dirname,
    defaultOptions = {
      extensions: ['js', 'json', 'coffee'],
      recurse: true,
      rename: function(name) {
        return name;
      },
      visit: function(obj) {
        return obj;
      }
    };
function checkFileInclusion(path, filename, options) {
  return ((new RegExp('\\.(' + options.extensions.join('|') + ')$', 'i').test(filename)) && !(options.include && options.include instanceof RegExp && !options.include.test(path)) && !(options.include && typeof options.include === 'function' && !options.include(path, filename)) && !(options.exclude && options.exclude instanceof RegExp && options.exclude.test(path)) && !(options.exclude && typeof options.exclude === 'function' && options.exclude(path, filename)));
}
function requireDirectory(m, path, options) {
  var retval = {};
  if (path && !options && typeof path !== 'string') {
    options = path;
    path = null;
  }
  options = options || {};
  for (var prop in defaultOptions) {
    if (typeof options[prop] === 'undefined') {
      options[prop] = defaultOptions[prop];
    }
  }
  path = !path ? dirname(m.filename) : resolve(dirname(m.filename), path);
  fs.readdirSync(path).forEach(function(filename) {
    var joined = join(path, filename),
        files,
        key,
        obj;
    if (fs.statSync(joined).isDirectory() && options.recurse) {
      files = requireDirectory(m, joined, options);
      if (Object.keys(files).length) {
        retval[options.rename(filename, joined, filename)] = files;
      }
    } else {
      if (joined !== m.filename && checkFileInclusion(joined, filename, options)) {
        key = filename.substring(0, filename.lastIndexOf('.'));
        obj = m.require(joined);
        retval[options.rename(key, joined, filename)] = options.visit(obj, joined, filename) || obj;
      }
    }
  });
  return retval;
}
module.exports = requireDirectory;
module.exports.defaults = defaultOptions;
