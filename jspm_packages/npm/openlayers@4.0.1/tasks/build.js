/* */ 
"format cjs";
(function(process) {
  var path = require('path');
  var async = require('async');
  var closure = require('closure-util');
  var fs = require('fs-extra');
  var nomnom = require('nomnom');
  var temp = require('temp').track();
  var exec = require('child_process').exec;
  var generateExports = require('./generate-exports');
  var log = closure.log;
  var root = path.join(__dirname, '..');
  var umdWrapper = ';(function (root, factory) {\n' + '  if (typeof exports === "object") {\n' + '    module.exports = factory();\n' + '  } else if (typeof define === "function" && define.amd) {\n' + '    define([], factory);\n' + '  } else {\n' + '    root.ol = factory();\n' + '  }\n' + '}(this, function () {\n' + '  var OPENLAYERS = {};\n' + '  %output%\n' + '  return OPENLAYERS.ol;\n' + '}));\n';
  var version;
  function assertValidConfig(config, callback) {
    process.nextTick(function() {
      if (!Array.isArray(config.exports)) {
        callback(new Error('Config missing "exports" array'));
        return;
      }
      if (config.namespace && typeof config.namespace !== 'string') {
        callback(new Error('Config "namespace" must be a string'));
        return;
      }
      if (config.compile && typeof config.compile !== 'object') {
        callback(new Error('Config "compile" must be an object'));
        return;
      }
      if (config.jvm && !Array.isArray(config.jvm)) {
        callback(new Error('Config "jvm" must be an array'));
        return;
      }
      if (config.src && !Array.isArray(config.src)) {
        callback(new Error('Config "src" must be an array'));
        return;
      }
      if (config.umd) {
        config.namespace = 'OPENLAYERS';
        if (config.compile) {
          config.compile.output_wrapper = umdWrapper;
          if (version) {
            if (!config.compile.define) {
              config.compile.define = [];
            }
            config.compile.define.push('ol.VERSION=\'' + version + '\'');
          }
        }
      }
      callback(null);
    });
  }
  function readConfig(configPath, callback) {
    fs.readFile(configPath, function(err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          err = new Error('Unable to find config file: ' + configPath);
        }
        callback(err);
        return;
      }
      var config;
      try {
        config = JSON.parse(String(data));
      } catch (err2) {
        callback(new Error('Trouble parsing config as JSON: ' + err2.message));
        return;
      }
      callback(null, config);
    });
  }
  function writeExports(exports, callback) {
    temp.open({
      prefix: 'exports',
      suffix: '.js'
    }, function(err, info) {
      if (err) {
        callback(err);
        return;
      }
      log.verbose('build', 'Writing exports: ' + info.path);
      fs.writeFile(info.path, exports, function(err) {
        if (err) {
          callback(err);
          return;
        }
        fs.close(info.fd, function(err) {
          if (err) {
            callback(err);
            return;
          }
          callback(null, info.path);
        });
      });
    });
  }
  function getDependencies(config, exports, callback) {
    writeExports(exports, function(err, exportsPath) {
      if (err) {
        callback(err);
        return;
      }
      log.info('ol', 'Parsing dependencies');
      var options;
      if (config.src) {
        options = {
          lib: config.src,
          cwd: config.cwd
        };
      } else {
        options = {
          lib: ['src/**/*.js', 'build/ol.ext/*.js'],
          cwd: root
        };
      }
      closure.getDependencies(options, function(err, paths) {
        if (err) {
          callback(err);
          return;
        }
        paths.push(exportsPath);
        callback(null, paths);
      });
    });
  }
  function concatenate(paths, callback) {
    async.map(paths, fs.readFile, function(err, results) {
      if (err) {
        var msg = 'Trouble concatenating sources.  ' + err.message;
        callback(new Error(msg));
      } else {
        var parts = umdWrapper.split('%output%');
        var src = parts[0] + 'var goog = this.goog = {};\n' + 'this.CLOSURE_NO_DEPS = true;\n' + results.join('\n') + 'ol.VERSION = \'' + version + '\';\n' + 'OPENLAYERS.ol = ol;\n' + parts[1];
        callback(null, src);
      }
    });
  }
  function build(config, paths, callback) {
    var options = {
      compile: config.compile,
      cwd: config.cwd || root,
      jvm: config.jvm
    };
    if (!options.compile) {
      log.info('ol', 'No compile options found.  Concatenating ' + paths.length + ' sources');
      concatenate(paths, callback);
    } else {
      log.info('ol', 'Compiling ' + paths.length + ' sources');
      paths = paths.concat('src/ol/typedefs.js');
      options.compile.js = paths.concat(options.compile.js || []);
      closure.compile(options, callback);
    }
  }
  function getVersion(callback) {
    exec('git describe --tags', function(error, stdout, stderr) {
      version = stdout.trim();
      callback(null);
    });
  }
  function addHeader(compiledSource, callback) {
    var header = '// OpenLayers. See https://openlayers.org/\n';
    header += '// License: https://raw.githubusercontent.com/openlayers/' + 'openlayers/master/LICENSE.md\n';
    if (version !== '') {
      header += '// Version: ' + version + '\n';
    }
    callback(null, header + compiledSource);
  }
  function main(config, callback) {
    async.waterfall([getVersion, assertValidConfig.bind(null, config), generateExports.bind(null, config), getDependencies.bind(null, config), build.bind(null, config), addHeader], callback);
  }
  if (require.main === module) {
    var options = nomnom.options({
      config: {
        position: 0,
        required: true,
        help: 'Path to JSON config file'
      },
      output: {
        position: 1,
        required: true,
        help: 'Output file path'
      },
      loglevel: {
        abbr: 'l',
        choices: ['silly', 'verbose', 'info', 'warn', 'error'],
        default: 'info',
        help: 'Log level',
        metavar: 'LEVEL'
      }
    }).parse();
    log.level = options.loglevel;
    async.waterfall([readConfig.bind(null, options.config), main, fs.outputFile.bind(fs, options.output)], function(err) {
      if (err) {
        log.error(err.message);
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
  }
  module.exports = main;
})(require('process'));
