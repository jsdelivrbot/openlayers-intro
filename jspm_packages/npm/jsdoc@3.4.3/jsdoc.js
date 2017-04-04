/* */ 
(function(process) {
  (function(args) {
    'use strict';
    var path;
    if (args[0] && typeof args[0] === 'object') {
      args = [__dirname, process.cwd()];
      path = require('path');
      require = require('requizzle')({
        requirePaths: {
          before: [path.join(__dirname, 'lib')],
          after: [path.join(__dirname, 'node_modules')]
        },
        infect: true
      });
    }
    require('./lib/jsdoc/util/runtime').initialize(args);
  })(Array.prototype.slice.call(arguments, 0));
  global.env = (function() {
    'use strict';
    return require('./lib/jsdoc/env');
  })();
  global.app = (function() {
    'use strict';
    return require('./lib/jsdoc/app');
  })();
  (function() {
    'use strict';
    var env = global.env;
    var logger = require('./lib/jsdoc/util/logger');
    var runtime = require('./lib/jsdoc/util/runtime');
    var cli = require('./cli');
    function cb(errorCode) {
      cli.logFinish();
      cli.exit(errorCode || 0);
    }
    cli.setVersionInfo().loadConfig();
    if (!env.opts.test) {
      cli.configureLogger();
    }
    cli.logStart();
    if (env.opts.debug) {
      global.dump = function() {
        console.log(require('./lib/jsdoc/util/dumper').dump(arguments));
      };
    }
    cli.runCommand(cb);
  })();
})(require('process'));
