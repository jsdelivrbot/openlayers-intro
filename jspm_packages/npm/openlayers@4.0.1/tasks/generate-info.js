/* */ 
(function(process) {
  var fs = require('fs-extra');
  var path = require('path');
  var spawn = require('child_process').spawn;
  var async = require('async');
  var walk = require('walk').walk;
  var isWindows = process.platform.indexOf('win') === 0;
  var sourceDir = path.join(__dirname, '..', 'src');
  var externsDir = path.join(__dirname, '..', 'externs');
  var externsPaths = [path.join(externsDir, 'olx.js'), path.join(externsDir, 'geojson.js')];
  var infoPath = path.join(__dirname, '..', 'build', 'info.json');
  var jsdocResolved = require.resolve('jsdoc/jsdoc.js');
  var jsdoc = path.resolve(path.dirname(jsdocResolved), '../.bin/jsdoc');
  if (isWindows) {
    jsdoc += '.cmd';
  }
  var jsdocConfig = path.join(__dirname, '..', 'config', 'jsdoc', 'info', 'conf.json');
  function getInfoTime(callback) {
    fs.stat(infoPath, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          callback(null, new Date(0));
        } else {
          callback(err);
        }
      } else {
        callback(null, stats.mtime);
      }
    });
  }
  function getNewerExterns(date, callback) {
    var newer = false;
    var walker = walk(externsDir);
    walker.on('file', function(root, stats, next) {
      var sourcePath = path.join(root, stats.name);
      externsPaths.forEach(function(path) {
        if (sourcePath === path && stats.mtime > date) {
          newer = true;
        }
      });
      next();
    });
    walker.on('errors', function() {
      callback(new Error('Trouble walking ' + externsDir));
    });
    walker.on('end', function() {
      callback(null, date, newer);
    });
  }
  function getNewer(date, newer, callback) {
    var paths = [].concat(externsPaths);
    var walker = walk(sourceDir);
    walker.on('file', function(root, stats, next) {
      var sourcePath = path.join(root, stats.name);
      if (/\.js$/.test(sourcePath)) {
        paths.push(sourcePath);
        if (stats.mtime > date) {
          newer = true;
        }
      }
      next();
    });
    walker.on('errors', function() {
      callback(new Error('Trouble walking ' + sourceDir));
    });
    walker.on('end', function() {
      if (isWindows) {
        paths = [sourceDir].concat(externsPaths);
      }
      callback(null, newer ? paths : []);
    });
  }
  function parseOutput(output) {
    if (!output) {
      throw new Error('Expected JSON output');
    }
    var info;
    try {
      info = JSON.parse(String(output));
    } catch (err) {
      throw new Error('Failed to parse output as JSON: ' + output);
    }
    if (!Array.isArray(info.symbols)) {
      throw new Error('Expected symbols array: ' + output);
    }
    if (!Array.isArray(info.defines)) {
      throw new Error('Expected defines array: ' + output);
    }
    return info;
  }
  function spawnJSDoc(paths, callback) {
    if (paths.length === 0) {
      process.nextTick(function() {
        callback(null, null);
      });
      return;
    }
    var output = '';
    var errors = '';
    var cwd = path.join(__dirname, '..');
    var child = spawn(jsdoc, ['-c', jsdocConfig].concat(paths), {cwd: cwd});
    child.stdout.on('data', function(data) {
      output += String(data);
    });
    child.stderr.on('data', function(data) {
      errors += String(data);
    });
    child.on('exit', function(code) {
      if (code) {
        callback(new Error(errors || 'JSDoc failed with no output'));
      } else {
        var info;
        try {
          info = parseOutput(output);
        } catch (err) {
          callback(err);
          return;
        }
        callback(null, info);
      }
    });
  }
  var getProvides = async.memoize(function(srcPath, callback) {
    fs.readFile(srcPath, function(err, data) {
      if (err) {
        callback(err);
        return;
      }
      var provides = [];
      var matcher = /goog\.provide\('(.*)'\)/;
      String(data).split('\n').forEach(function(line) {
        var match = line.match(matcher);
        if (match) {
          provides.push(match[1]);
        }
      });
      callback(null, provides);
    });
  });
  function addSymbolProvides(info, callback) {
    if (!info) {
      process.nextTick(function() {
        callback(null, null);
      });
      return;
    }
    function addProvides(symbol, callback) {
      getProvides(symbol.path, function(err, provides) {
        if (err) {
          callback(err);
          return;
        }
        symbol.provides = provides;
        callback(null, symbol);
      });
    }
    async.map(info.symbols, addProvides, function(err, newSymbols) {
      info.symbols = newSymbols;
      callback(err, info);
    });
  }
  function writeInfo(info, callback) {
    if (info) {
      var str = JSON.stringify(info, null, '  ');
      fs.outputFile(infoPath, str, callback);
    } else {
      process.nextTick(function() {
        callback(null);
      });
    }
  }
  function main(callback) {
    async.waterfall([getInfoTime, getNewerExterns, getNewer, spawnJSDoc, addSymbolProvides, writeInfo], callback);
  }
  if (require.main === module) {
    main(function(err) {
      if (err) {
        process.stderr.write(err.message + '\n');
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
  }
  module.exports = main;
})(require('process'));
