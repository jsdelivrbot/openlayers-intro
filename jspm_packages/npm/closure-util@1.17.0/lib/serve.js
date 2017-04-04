/* */ 
(function(process) {
  var async = require('async');
  var log = require('npmlog');
  var config = require('./config');
  var configfile = require('./configfile');
  var manager = require('./manager');
  var server = require('./server');
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
      callback(null, config);
    });
  }
  function createServer(config, callback) {
    var srv;
    var mgr = new manager.Manager({lib: config.lib});
    mgr.on('error', function(err) {
      if (server) {
        log.error('serve', err.message);
      } else {
        callback(err);
      }
    });
    mgr.on('ready', function() {
      srv = new server.Server({manager: mgr});
      callback(null, config, srv);
    });
  }
  function listen(config, server, callback) {
    var port = config.serve && config.serve.port ? config.serve.port : 3000;
    server.listen(port, function() {
      log.info('closure-util', 'Listening on http://localhost:' + port + '/ (Ctrl+C to stop)');
    });
    server.on('error', function(err) {
      log.error('serve', 'Server failed to start: ' + err.message);
      callback(err);
    });
    callback(null);
  }
  module.exports = function(configFile, callback) {
    async.waterfall([readConfig.bind(null, configFile), assertValidConfig, createServer, listen], function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  };
})(require('process'));
