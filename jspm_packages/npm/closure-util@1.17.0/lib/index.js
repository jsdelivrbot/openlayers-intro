/* */ 
var log = require('npmlog');
var Manager = require('./manager').Manager;
var Server = require('./server').Server;
var compile = require('./compile');
var util = require('./util');
exports.Manager = Manager;
exports.Server = Server;
exports.compile = compile;
exports.log = log;
exports.getDependencies = function(options, callback) {
  var manager = new Manager(options);
  manager.on('error', callback);
  manager.on('beforewatch', function() {
    manager.close();
    var paths;
    try {
      paths = manager.getDependencies(options.main).map(function(script) {
        return script.path;
      });
    } catch (err) {
      return callback(err);
    }
    callback(null, paths);
  });
};
exports.getLibraryPath = util.getLibraryPath;
exports.getCompilerPath = util.getCompilerPath;
