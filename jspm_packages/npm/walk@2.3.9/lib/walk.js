/* */ 
(function(process) {
  (function() {
    "use strict";
    function noop() {}
    var fs = require('fs'),
        forEachAsync = require('foreachasync').forEachAsync,
        EventEmitter = require('events').EventEmitter,
        TypeEmitter = require('./node-type-emitter'),
        util = require('util'),
        path = require('path');
    ;
    function appendToDirs(stat) {
      this.push(stat.name);
    }
    function wFilesHandlerWrapper(items) {
      this._wFilesHandler(noop, items);
    }
    function Walker(pathname, options, sync) {
      EventEmitter.call(this);
      var me = this;
      ;
      options = options || {};
      me._wStat = options.followLinks && 'stat' || 'lstat';
      me._wStatSync = me._wStat + 'Sync';
      me._wsync = sync;
      me._wq = [];
      me._wqueue = [me._wq];
      me._wcurpath = undefined;
      me._wfilters = options.filters || [];
      me._wfirstrun = true;
      me._wcurpath = pathname;
      if (me._wsync) {
        me._wWalk = me._wWalkSync;
      } else {
        me._wWalk = me._wWalkAsync;
      }
      options.listeners = options.listeners || {};
      Object.keys(options.listeners).forEach(function(event) {
        var callbacks = options.listeners[event];
        ;
        if ('function' === typeof callbacks) {
          callbacks = [callbacks];
        }
        callbacks.forEach(function(callback) {
          me.on(event, callback);
        });
      });
      me._wWalk();
    }
    util.inherits(Walker, EventEmitter);
    Walker.prototype._wLstatHandler = function(err, stat) {
      var me = this;
      ;
      stat = stat || {};
      stat.name = me._wcurfile;
      if (err) {
        stat.error = err;
        me.emit('nodeError', me._wcurpath, stat, noop);
        me._wfnodegroups.errors.push(stat);
        me._wCurFileCallback();
      } else {
        TypeEmitter.sortFnodesByType(stat, me._wfnodegroups);
        TypeEmitter.emitNodeType(me, me._wcurpath, stat, me._wCurFileCallback, me);
      }
    };
    Walker.prototype._wFilesHandler = function(cont, file) {
      var statPath,
          me = this;
      ;
      me._wcurfile = file;
      me._wCurFileCallback = cont;
      me.emit('name', me._wcurpath, file, noop);
      statPath = me._wcurpath + path.sep + file;
      if (!me._wsync) {
        fs[me._wStat](statPath, function(err, stat) {
          me._wLstatHandler(err, stat);
        });
        return;
      }
      try {
        me._wLstatHandler(null, fs[me._wStatSync](statPath));
      } catch (e) {
        me._wLstatHandler(e);
      }
    };
    Walker.prototype._wOnEmitDone = function() {
      var me = this,
          dirs = [];
      ;
      me._wfnodegroups.directories.forEach(appendToDirs, dirs);
      dirs.forEach(me._wJoinPath, me);
      me._wqueue.push(me._wq = dirs);
      me._wNext();
    };
    Walker.prototype._wPostFilesHandler = function() {
      var me = this;
      ;
      if (me._wfnodegroups.errors.length) {
        me.emit('errors', me._wcurpath, me._wfnodegroups.errors, noop);
      }
      TypeEmitter.emitNodeTypeGroups(me, me._wcurpath, me._wfnodegroups, me._wOnEmitDone, me);
    };
    Walker.prototype._wReadFiles = function() {
      var me = this;
      ;
      if (!me._wcurfiles || 0 === me._wcurfiles.length) {
        return me._wNext();
      }
      me.emit('names', me._wcurpath, me._wcurfiles, noop);
      if (me._wsync) {
        me._wcurfiles.forEach(wFilesHandlerWrapper, me);
        me._wPostFilesHandler();
      } else {
        forEachAsync(me._wcurfiles, me._wFilesHandler, me).then(me._wPostFilesHandler);
      }
    };
    Walker.prototype._wReaddirHandler = function(err, files) {
      var fnodeGroups = TypeEmitter.createNodeGroups(),
          me = this,
          parent,
          child;
      ;
      me._wfnodegroups = fnodeGroups;
      me._wcurfiles = files;
      if (!err) {
        me._wReadFiles();
        return;
      }
      me._wcurpath = me._wcurpath.replace(/\/$/, '');
      if (!me._wfirstrun) {
        me.emit('directoryError', me._wcurpath, {error: err}, noop);
        me._wReadFiles();
        return;
      }
      me._wfirstrun = false;
      parent = me._wcurpath.replace(/^(.*)\/.*$/, '$1');
      fs[me._wStat](parent, function(e, stat) {
        if (stat) {
          child = me._wcurpath.replace(/^.*\/(.*)$/, '$1');
          me._wcurfiles = [child];
          me._wcurpath = parent;
        } else {
          me.emit('nodeError', me._wcurpath, {error: err}, noop);
        }
        me._wReadFiles();
      });
    };
    Walker.prototype._wFilter = function() {
      var me = this,
          exclude;
      ;
      exclude = me._wfilters.some(function(filter) {
        if (me._wcurpath.match(filter)) {
          return true;
        }
      });
      return exclude;
    };
    Walker.prototype._wWalkSync = function() {
      var err,
          files,
          me = this;
      ;
      try {
        files = fs.readdirSync(me._wcurpath);
      } catch (e) {
        err = e;
      }
      me._wReaddirHandler(err, files);
    };
    Walker.prototype._wWalkAsync = function() {
      var me = this;
      ;
      fs.readdir(me._wcurpath, function(err, files) {
        me._wReaddirHandler(err, files);
      });
    };
    Walker.prototype._wNext = function() {
      var me = this;
      ;
      if (me._paused) {
        return;
      }
      if (me._wq.length) {
        me._wcurpath = me._wq.pop();
        while (me._wq.length && me._wFilter()) {
          me._wcurpath = me._wq.pop();
        }
        if (me._wcurpath && !me._wFilter()) {
          me._wWalk();
        } else {
          me._wNext();
        }
        return;
      }
      me._wqueue.length -= 1;
      if (me._wqueue.length) {
        me._wq = me._wqueue[me._wqueue.length - 1];
        return me._wNext();
      }
      me.emit('end');
    };
    Walker.prototype._wJoinPath = function(v, i, o) {
      var me = this;
      ;
      o[i] = [me._wcurpath, path.sep, v].join('');
    };
    Walker.prototype.pause = function() {
      this._paused = true;
    };
    Walker.prototype.resume = function() {
      this._paused = false;
      this._wNext();
    };
    exports.walk = function(path, opts) {
      return new Walker(path, opts, false);
    };
    exports.walkSync = function(path, opts) {
      return new Walker(path, opts, true);
    };
  }());
})(require('process'));
