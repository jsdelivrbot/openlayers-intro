/* */ 
(function(process) {
  'use strict';
  var env = require('../../../env');
  var os = require('os');
  var NODE = exports.NODE = 'node';
  var runtime = (function() {
    if (require && require.main && module) {
      return NODE;
    } else {
      throw new Error('Unable to identify the current JavaScript runtime.');
    }
  })();
  exports.isNode = function() {
    return runtime === NODE;
  };
  function initializeNode(args) {
    var fs = require('fs');
    var path = require('path');
    var jsdocPath = args[0];
    var pwd = args[1];
    if (fs.statSync(jsdocPath).isSymbolicLink()) {
      jsdocPath = path.resolve(path.dirname(jsdocPath), fs.readlinkSync(jsdocPath));
    }
    env.dirname = jsdocPath;
    env.pwd = pwd;
    env.args = process.argv.slice(2);
  }
  exports.initialize = function(args) {
    switch (runtime) {
      case NODE:
        initializeNode(args);
        break;
      default:
        throw new Error('Cannot initialize the unknown JavaScript runtime "' + runtime + '"!');
    }
  };
  exports.getRuntime = function() {
    return runtime;
  };
  exports.getModulePath = function(partialPath) {
    var path = require('path');
    return path.join(env.dirname, runtime, partialPath);
  };
})(require('process'));
