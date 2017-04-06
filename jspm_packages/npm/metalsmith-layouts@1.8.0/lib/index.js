/* */ 
(function(Buffer) {
  var consolidate = require('consolidate');
  var debug = require('debug')('metalsmith-layouts');
  var each = require('async').each;
  var extend = require('extend');
  var omit = require('lodash.omit');
  var path = require('path');
  var check = require('./helpers/check');
  var readPartials = require('./helpers/read-partials');
  module.exports = plugin;
  var settings = ['default', 'directory', 'engine', 'partials', 'partialExtension', 'pattern', 'rename', 'exposeConsolidate'];
  function plugin(opts) {
    opts = opts || {};
    if (typeof opts === 'string') {
      opts = {engine: opts};
    }
    if (!opts.engine) {
      throw new Error('"engine" option required');
    }
    if (!consolidate[opts.engine]) {
      throw new Error('Unknown template engine: "' + opts.engine + '"');
    }
    if (typeof opts.exposeConsolidate === 'function') {
      opts.exposeConsolidate(consolidate.requires);
    }
    var def = opts.default;
    var dir = opts.directory || 'layouts';
    var engine = opts.engine;
    var partialExtension = opts.partialExtension;
    var partials = opts.partials;
    var pattern = opts.pattern;
    var rename = opts.rename;
    var params = omit(opts, settings);
    return function(files, metalsmith, done) {
      var metadata = metalsmith.metadata();
      var matches = {};
      if (partials) {
        if (typeof partials === 'string') {
          params.partials = readPartials(partials, partialExtension, dir, metalsmith);
        } else {
          params.partials = partials;
        }
      }
      Object.keys(files).forEach(function(file) {
        if (!check(files, file, pattern, def)) {
          return;
        }
        debug('stringifying file: %s', file);
        var data = files[file];
        data.contents = data.contents.toString();
        matches[file] = data;
      });
      function convert(file, done) {
        debug('converting file: %s', file);
        var data = files[file];
        var clonedParams = extend(true, {}, params);
        var clone = extend({}, clonedParams, metadata, data);
        var str = metalsmith.path(dir, data.layout || def);
        var render = consolidate[engine];
        var fileInfo;
        if (rename) {
          delete files[file];
          fileInfo = path.parse(file);
          file = path.join(fileInfo.dir, fileInfo.name + '.html');
          debug('renamed file to: %s', file);
        }
        render(str, clone, function(err, str) {
          if (err) {
            return done(err);
          }
          data.contents = new Buffer(str);
          debug('converted file: %s', file);
          files[file] = data;
          done();
        });
      }
      each(Object.keys(matches), convert, done);
    };
  }
})(require('buffer').Buffer);
