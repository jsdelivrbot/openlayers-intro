/* */ 
(function(process) {
  var fs = require('fs');
  var path = require('path');
  function find(file) {
    var dir = path.dirname(file);
    var base = path.basename(file);
    try {
      fs.statSync(file);
    } catch (err) {
      var parent = path.dirname(dir);
      if (parent !== dir) {
        file = find(path.join(parent, base));
      } else {
        file = undefined;
      }
    }
    return file;
  }
  function getEnv(prefix) {
    var obj = {};
    var length = prefix.length;
    for (var key in process.env) {
      if (key.indexOf(prefix) === 0) {
        obj[key.substring(length)] = process.env[key];
      }
    }
    return obj;
  }
  var config = require(path.join(__dirname, '..', 'default-config.json'));
  var configName = 'closure-util.json';
  var key;
  var installPath = find(path.join(__dirname, configName));
  if (installPath) {
    var installConfig = require(installPath);
    for (key in installConfig) {
      config[key] = installConfig[key];
    }
  }
  var cwdPath = find(path.join(process.cwd(), configName));
  if (cwdPath) {
    var cwdConfig = require(cwdPath);
    for (key in cwdConfig) {
      config[key] = cwdConfig[key];
    }
  }
  var env = getEnv('closure_');
  for (key in env) {
    config[key] = env[key];
  }
  exports.get = function(key) {
    return config[key];
  };
})(require('process'));
