/* */ 
(function(process) {
  var EventEmitter = require('events').EventEmitter;
  var path = require('path');
  var util = require('util');
  var async = require('async');
  var Gaze = require('gaze').Gaze;
  var log = require('npmlog');
  var config = require('./config');
  var globs = require('./util').globs;
  var getLibraryPath = require('./util').getLibraryPath;
  var minimatches = require('./util').minimatches;
  var scripts = require('./scripts');
  log.level = config.get('log_level');
  var Manager = exports.Manager = function Manager(options) {
    EventEmitter.call(this);
    options = options || {};
    this._scripts = {};
    this._errors = {};
    this._dependencies = {};
    this._cwd = options.cwd || process.cwd();
    var lib = options.lib || [];
    if (!Array.isArray(lib)) {
      lib = [lib];
    }
    this._lib = lib;
    var main = options.main || [];
    if (!Array.isArray(main)) {
      main = [main];
    }
    this._main = main;
    this._ignoreRequires = options.ignoreRequires ? new RegExp(options.ignoreRequires) : null;
    this._gaze = null;
    this._closed = false;
    var paths = lib.concat(main);
    if (options.closure !== false) {
      var closure = getLibraryPath();
      paths = paths.concat([path.join(closure, 'closure', 'goog', '**', '*.js'), path.join(closure, 'third_party', 'closure', 'goog', '**', '*.js')]);
    }
    process.nextTick(function() {
      this._processPaths(paths);
    }.bind(this));
  };
  util.inherits(Manager, EventEmitter);
  Manager.prototype._addScript = function(script) {
    var filepath = script.path;
    if (this._scripts.hasOwnProperty(filepath)) {
      throw new Error('Script with same path already added: ' + filepath);
    }
    log.verbose('manager', 'Adding ' + filepath);
    this._scripts[filepath] = script;
    this._dependencies = {};
  };
  Manager.prototype.getDependencies = function(opt_main) {
    var main = opt_main && path.resolve(opt_main);
    var scriptsLookup = this._scripts;
    var ignoreRequires = this._ignoreRequires;
    if (main && !scriptsLookup.hasOwnProperty(main)) {
      throw new Error('Main script not currently managed: ' + main);
    }
    var mainKey = main || '*';
    if (!this._dependencies.hasOwnProperty(mainKey)) {
      var providesLookup = {};
      var base = [];
      var depsOnly = [];
      Object.keys(scriptsLookup).forEach(function(filepath) {
        var script = scriptsLookup[filepath];
        script.provides.forEach(function(provide) {
          if (provide === 'goog') {
            base.push(filepath);
          }
          if (providesLookup.hasOwnProperty(provide)) {
            throw new Error('Redundant provide "' + provide + '" ' + 'in script: ' + filepath + ' - already provided by ' + providesLookup[provide].path);
          }
          providesLookup[provide] = script;
        });
        if (script.provides.length === 0 && script.requires.length === 0 && script.addsDependencies) {
          depsOnly.push(script);
        }
      });
      var visited = {};
      var dependencies = [];
      if (base.length === 0) {
        throw new Error('Could not find base.js');
      } else if (base.length > 1) {
        throw new Error('Found more than one base: ' + base.join(' '));
      }
      visited[base[0]] = true;
      dependencies[0] = scriptsLookup[base[0]];
      var visit = function(script) {
        if (!visited.hasOwnProperty(script.path)) {
          visited[script.path] = true;
          script.requires.forEach(function(require) {
            if (!providesLookup.hasOwnProperty(require)) {
              if (!ignoreRequires || !require.match(ignoreRequires)) {
                throw new Error('Unsatisfied dependency "' + require + '" ' + 'in script: ' + script.path);
              }
            } else {
              visit(providesLookup[require]);
            }
          });
          if (script.provides.length > 0 || script.requires.length > 0) {
            dependencies.push(script);
          }
        }
      };
      if (main) {
        visit(scriptsLookup[main]);
      } else {
        var lib = this._lib;
        var cwd = this._cwd;
        Object.keys(scriptsLookup).forEach(function(filepath) {
          if (minimatches(path.relative(cwd, filepath), lib)) {
            visit(scriptsLookup[filepath]);
          }
        });
      }
      if (depsOnly.length > 0) {
        dependencies = dependencies.concat(depsOnly);
      }
      this._dependencies[mainKey] = dependencies;
    }
    return this._dependencies[mainKey];
  };
  Manager.prototype.getErrors = function() {
    var errors = this._errors;
    return Object.keys(errors).map(function(key) {
      return errors[key];
    });
  };
  Manager.prototype.getScript = function(filepath) {
    return this._scripts[filepath] || null;
  };
  Manager.prototype._processPaths = function(paths) {
    var self = this;
    async.waterfall([function(callback) {
      globs(paths, {cwd: self._cwd}, callback);
    }, function(paths, callback) {
      paths = paths.map(function(relative) {
        return path.resolve(self._cwd, relative);
      });
      async.map(paths, scripts.read, callback);
    }, function(results, callback) {
      var err;
      try {
        results.forEach(self._addScript.bind(self));
      } catch (e) {
        err = e;
      }
      callback(err);
    }], function(err) {
      if (err) {
        log.verbose('manager', err);
        self.emit('error', err);
      } else {
        self.emit('beforewatch');
        self._startWatch();
      }
    });
  };
  Manager.prototype._startWatch = function() {
    if (this._closed) {
      return;
    }
    var paths = this._lib.concat(this._main);
    var gaze = new Gaze(paths);
    gaze.on('changed', this._handleChanged.bind(this));
    gaze.on('added', function(filepath) {
      if (minimatches(path.relative(this._cwd, filepath), paths)) {
        this._handleChanged(filepath);
      }
    }.bind(this));
    gaze.on('deleted', this._handleDeleted.bind(this));
    this._gaze = gaze;
    this.emit('ready');
  };
  Manager.prototype._handleChanged = function(filepath) {
    var self = this;
    scripts.read(filepath, function(err, script) {
      if (err) {
        log.verbose('manager', err);
        self._errors[filepath] = err;
        return self.emit('error', err);
      } else {
        delete self._errors[filepath];
      }
      log.verbose('manager', 'updated ' + filepath);
      delete self._scripts[filepath];
      self._addScript(script);
      self.emit('update', script);
    });
  };
  Manager.prototype._handleDeleted = function(filepath) {
    delete this._scripts[filepath];
    delete this._errors[filepath];
    this._dependencies = {};
    log.verbose('manager', 'deleted ' + filepath);
    this.emit('update');
  };
  Manager.prototype.close = function() {
    if (this._gaze) {
      this._gaze.close();
      delete this._gaze;
    }
    if (!this._closed) {
      this._closed = true;
      this.emit('close');
    }
  };
})(require('process'));
