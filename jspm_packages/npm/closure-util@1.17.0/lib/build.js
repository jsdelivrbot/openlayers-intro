/* */ 
(function(process) {
  var async = require('async');
  var fse = require('fs-extra');
  var log = require('npmlog');
  var configfile = require('./configfile');
  var closure = require('./index');
  var config = require('./config');
  log.level = config.get('log_level');
  function readConfig(configFile, callback) {
    log.info('closure-util', 'Reading build config');
    configfile.readConfig(configFile, callback);
  }
  function assertValidConfig(config, callback) {
    process.nextTick(function() {
      if (!config.lib) {
        config.lib = config.src;
      }
      if (!Array.isArray(config.lib)) {
        callback(new Error('Config "lib" must be an array'));
        return;
      }
      if (typeof config.compile !== 'object') {
        callback(new Error('Config "compile" must be an object'));
        return;
      }
      if (config.jvm && !Array.isArray(config.jvm)) {
        callback(new Error('Config "jvm" must be an array'));
        return;
      }
      callback(null, config);
    });
  }
  function getDependencies(config, callback) {
    log.info('closure-util', 'Getting Closure dependencies');
    var options = {
      lib: config.lib || config.src,
      cwd: config.cwd || process.cwd()
    };
    closure.getDependencies(options, function(err, paths) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, config, paths);
    });
  }
  function compile(config, paths, callback) {
    log.info('closure-util', 'Compiling ' + paths.length + ' sources');
    var options = {
      compile: config.compile,
      cwd: config.cwd || process.cwd(),
      jvm: config.jvm
    };
    options.compile.js = paths.concat(config.compile.js || []);
    closure.compile(options, callback);
  }
  function writeOutput(outputFile, code, callback) {
    log.info('closure-util', 'Writing compiled code to ' + outputFile);
    fse.outputFile(outputFile, code, callback);
  }
  module.exports = function(configFile, outputFile, callback) {
    async.waterfall([readConfig.bind(null, configFile), assertValidConfig, getDependencies, compile, writeOutput.bind(null, outputFile)], function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  };
})(require('process'));
