/* */ 
(function(Buffer) {
  var absolute = require('absolute');
  var assert = require('assert');
  var clone = require('clone');
  var fs = require('co-fs-extra');
  var is = require('is');
  var matter = require('gray-matter');
  var Mode = require('stat-mode');
  var path = require('path');
  var readdir = require('recursive-readdir');
  var rm = require('rimraf');
  var thunkify = require('thunkify');
  var unyield = require('unyield');
  var utf8 = require('is-utf8');
  var Ware = require('ware');
  readdir = thunkify(readdir);
  rm = thunkify(rm);
  module.exports = Metalsmith;
  function Metalsmith(directory) {
    if (!(this instanceof Metalsmith))
      return new Metalsmith(directory);
    assert(directory, 'You must pass a working directory path.');
    this.plugins = [];
    this.ignores = [];
    this.directory(directory);
    this.metadata({});
    this.source('src');
    this.destination('build');
    this.concurrency(Infinity);
    this.clean(true);
    this.frontmatter(true);
  }
  Metalsmith.prototype.use = function(plugin) {
    this.plugins.push(plugin);
    return this;
  };
  Metalsmith.prototype.directory = function(directory) {
    if (!arguments.length)
      return path.resolve(this._directory);
    assert(is.string(directory), 'You must pass a directory path string.');
    this._directory = directory;
    return this;
  };
  Metalsmith.prototype.metadata = function(metadata) {
    if (!arguments.length)
      return this._metadata;
    assert(is.object(metadata), 'You must pass a metadata object.');
    this._metadata = clone(metadata);
    return this;
  };
  Metalsmith.prototype.source = function(path) {
    if (!arguments.length)
      return this.path(this._source);
    assert(is.string(path), 'You must pass a source path string.');
    this._source = path;
    return this;
  };
  Metalsmith.prototype.destination = function(path) {
    if (!arguments.length)
      return this.path(this._destination);
    assert(is.string(path), 'You must pass a destination path string.');
    this._destination = path;
    return this;
  };
  Metalsmith.prototype.concurrency = function(max) {
    if (!arguments.length)
      return this._concurrency;
    assert(is.number(max), 'You must pass a number for concurrency.');
    this._concurrency = max;
    return this;
  };
  Metalsmith.prototype.clean = function(clean) {
    if (!arguments.length)
      return this._clean;
    assert(is.boolean(clean), 'You must pass a boolean.');
    this._clean = clean;
    return this;
  };
  Metalsmith.prototype.frontmatter = function(frontmatter) {
    if (!arguments.length)
      return this._frontmatter;
    assert(is.boolean(frontmatter), 'You must pass a boolean.');
    this._frontmatter = frontmatter;
    return this;
  };
  Metalsmith.prototype.ignore = function(files) {
    if (!arguments.length)
      return this.ignores.slice();
    this.ignores = this.ignores.concat(files);
    return this;
  };
  Metalsmith.prototype.path = function() {
    var paths = [].slice.call(arguments);
    paths.unshift(this.directory());
    return path.resolve.apply(path, paths);
  };
  Metalsmith.prototype.build = unyield(function*() {
    var clean = this.clean();
    var dest = this.destination();
    if (clean)
      yield rm(path.join(dest, '*'));
    var files = yield this.process();
    yield this.write(files);
    return files;
  });
  Metalsmith.prototype.process = unyield(function*() {
    var files = yield this.read();
    files = yield this.run(files);
    return files;
  });
  Metalsmith.prototype.run = unyield(function*(files, plugins) {
    var ware = new Ware(plugins || this.plugins);
    var run = thunkify(ware.run.bind(ware));
    var res = yield run(files, this);
    return res[0];
  });
  Metalsmith.prototype.read = unyield(function*(dir) {
    dir = dir || this.source();
    var read = this.readFile.bind(this);
    var concurrency = this.concurrency();
    var ignores = this.ignores || null;
    var paths = yield readdir(dir, ignores);
    var files = [];
    var complete = 0;
    var batch;
    while (complete < paths.length) {
      batch = paths.slice(complete, complete + concurrency);
      batch = yield batch.map(read);
      files = files.concat(batch);
      complete += concurrency;
    }
    return paths.reduce(memoizer, {});
    function memoizer(memo, file, i) {
      file = path.relative(dir, file);
      memo[file] = files[i];
      return memo;
    }
  });
  Metalsmith.prototype.readFile = unyield(function*(file) {
    var src = this.source();
    var ret = {};
    if (!absolute(file))
      file = path.resolve(src, file);
    try {
      var frontmatter = this.frontmatter();
      var stats = yield fs.stat(file);
      var buffer = yield fs.readFile(file);
      var parsed;
      if (frontmatter && utf8(buffer)) {
        try {
          parsed = matter(buffer.toString());
        } catch (e) {
          var err = new Error('Invalid frontmatter in the file at: ' + file);
          err.code = 'invalid_frontmatter';
          throw err;
        }
        ret = parsed.data;
        ret.contents = new Buffer(parsed.content);
      } else {
        ret.contents = buffer;
      }
      ret.mode = Mode(stats).toOctal();
      ret.stats = stats;
    } catch (e) {
      if (e.code == 'invalid_frontmatter')
        throw e;
      e.message = 'Failed to read the file at: ' + file + '\n\n' + e.message;
      e.code = 'failed_read';
      throw e;
    }
    return ret;
  });
  Metalsmith.prototype.write = unyield(function*(files, dir) {
    dir = dir || this.destination();
    var write = this.writeFile.bind(this);
    var concurrency = this.concurrency();
    var keys = Object.keys(files);
    var complete = 0;
    var batch;
    while (complete < keys.length) {
      batch = keys.slice(complete, complete + concurrency);
      yield batch.map(writer);
      complete += concurrency;
    }
    function writer(key) {
      var file = path.resolve(dir, key);
      return write(file, files[key]);
    }
  });
  Metalsmith.prototype.writeFile = unyield(function*(file, data) {
    var dest = this.destination();
    if (!absolute(file))
      file = path.resolve(dest, file);
    try {
      yield fs.outputFile(file, data.contents);
      if (data.mode)
        yield fs.chmod(file, data.mode);
    } catch (e) {
      e.message = 'Failed to write the file at: ' + file + '\n\n' + e.message;
      throw e;
    }
  });
})(require('buffer').Buffer);
