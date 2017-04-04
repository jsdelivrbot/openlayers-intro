/* */ 
(function(process) {
  'use strict';
  var util = require('util');
  function Logger() {}
  util.inherits(Logger, require('events').EventEmitter);
  var logger = module.exports = new Logger();
  var LEVELS = logger.LEVELS = {
    SILENT: 0,
    FATAL: 10,
    ERROR: 20,
    WARN: 30,
    INFO: 40,
    DEBUG: 50,
    VERBOSE: 1000
  };
  var DEFAULT_LEVEL = LEVELS.WARN;
  var logLevel = DEFAULT_LEVEL;
  var PREFIXES = {
    DEBUG: 'DEBUG: ',
    ERROR: 'ERROR: ',
    FATAL: 'FATAL: ',
    WARN: 'WARNING: '
  };
  function addPrefix(args, prefix) {
    var updatedArgs;
    if (prefix && typeof args[0] === 'string') {
      updatedArgs = args.slice(0);
      updatedArgs[0] = prefix + updatedArgs[0];
    }
    return updatedArgs || args;
  }
  function wrapLogFunction(name, func) {
    var eventName = 'logger:' + name;
    var upperCaseName = name.toUpperCase();
    var level = LEVELS[upperCaseName];
    var prefix = PREFIXES[upperCaseName];
    return function() {
      var loggerArgs;
      var args = Array.prototype.slice.call(arguments, 0);
      if (logLevel >= level) {
        loggerArgs = addPrefix(args, prefix);
        func.apply(null, loggerArgs);
      }
      args.unshift(eventName);
      logger.emit.apply(logger, args);
    };
  }
  function printToStdout() {
    var args = Array.prototype.slice.call(arguments, 0);
    process.stdout.write(util.format.apply(util, args));
  }
  logger.debug = wrapLogFunction('debug', console.info);
  logger.printDebug = wrapLogFunction('debug', printToStdout);
  logger.error = wrapLogFunction('error', console.error);
  logger.fatal = wrapLogFunction('fatal', console.error);
  logger.info = wrapLogFunction('info', console.info);
  logger.printInfo = wrapLogFunction('info', printToStdout);
  logger.verbose = wrapLogFunction('verbose', console.info);
  logger.printVerbose = wrapLogFunction('verbose', printToStdout);
  logger.warn = wrapLogFunction('warn', console.warn);
  logger.setLevel = function setLevel(level) {
    logLevel = (level !== undefined) ? level : DEFAULT_LEVEL;
  };
  logger.getLevel = function getLevel() {
    return logLevel;
  };
})(require('process'));
