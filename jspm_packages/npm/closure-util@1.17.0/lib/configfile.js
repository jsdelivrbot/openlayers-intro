/* */ 
var fs = require('graceful-fs');
var log = require('npmlog');
var config = require('./config');
log.level = config.get('log_level');
exports.readConfig = function(configPath, callback) {
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
};
