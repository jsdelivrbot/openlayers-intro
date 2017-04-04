/* */ 
(function(process) {
  module.exports = (function() {
    'use strict';
    var app = require('./app');
    var env = require('./env');
    var logger = require('./util/logger');
    var stripJsonComments = require('strip-json-comments');
    var Promise = require('bluebird');
    var hasOwnProp = Object.prototype.hasOwnProperty;
    var props = {
      docs: [],
      packageJson: null,
      shouldExitWithError: false,
      tmpdir: null
    };
    var FATAL_ERROR_MESSAGE = 'Exiting JSDoc because an error occurred. See the previous log ' + 'messages for details.';
    var cli = {};
    cli.setVersionInfo = function() {
      var fs = require('fs');
      var path = require('path');
      var info = JSON.parse(fs.readFileSync(path.join(env.dirname, 'package.json'), 'utf8'));
      env.version = {
        number: info.version,
        revision: new Date(parseInt(info.revision, 10)).toUTCString()
      };
      return cli;
    };
    cli.loadConfig = function() {
      var _ = require('underscore');
      var args = require('./opts/args');
      var Config = require('./config');
      var fs = require('./fs');
      var path = require('./path');
      var confPath;
      var isFile;
      var defaultOpts = {
        destination: './out/',
        encoding: 'utf8'
      };
      try {
        env.opts = args.parse(env.args);
      } catch (e) {
        console.error(e.message + '\n');
        cli.printHelp().then(function() {
          cli.exit(1);
        });
      }
      confPath = env.opts.configure || path.join(env.dirname, 'conf.json');
      try {
        isFile = fs.statSync(confPath).isFile();
      } catch (e) {
        isFile = false;
      }
      if (!isFile && !env.opts.configure) {
        confPath = path.join(env.dirname, 'conf.json.EXAMPLE');
      }
      try {
        env.conf = new Config(stripJsonComments(fs.readFileSync(confPath, 'utf8'))).get();
      } catch (e) {
        cli.exit(1, 'Cannot parse the config file ' + confPath + ': ' + e + '\n' + FATAL_ERROR_MESSAGE);
      }
      env.opts = _.defaults(env.opts, env.conf.opts, defaultOpts);
      return cli;
    };
    cli.configureLogger = function() {
      function recoverableError() {
        props.shouldExitWithError = true;
      }
      function fatalError() {
        cli.exit(1);
      }
      if (env.opts.debug) {
        logger.setLevel(logger.LEVELS.DEBUG);
      } else if (env.opts.verbose) {
        logger.setLevel(logger.LEVELS.INFO);
      }
      if (env.opts.pedantic) {
        logger.once('logger:warn', recoverableError);
        logger.once('logger:error', fatalError);
      } else {
        logger.once('logger:error', recoverableError);
      }
      logger.once('logger:fatal', fatalError);
      return cli;
    };
    cli.logStart = function() {
      logger.debug(cli.getVersion());
      logger.debug('Environment info: %j', {env: {
          conf: env.conf,
          opts: env.opts
        }});
    };
    cli.logFinish = function() {
      var delta;
      var deltaSeconds;
      if (env.run.finish && env.run.start) {
        delta = env.run.finish.getTime() - env.run.start.getTime();
      }
      if (delta !== undefined) {
        deltaSeconds = (delta / 1000).toFixed(2);
        logger.info('Finished running in %s seconds.', deltaSeconds);
      }
    };
    cli.runCommand = function(cb) {
      var cmd;
      var opts = env.opts;
      if (opts.help) {
        cmd = cli.printHelp;
      } else if (opts.test) {
        cmd = cli.runTests;
      } else if (opts.version) {
        cmd = cli.printVersion;
      } else {
        cmd = cli.main;
      }
      cmd().then(function(errorCode) {
        if (!errorCode && props.shouldExitWithError) {
          errorCode = 1;
        }
        cb(errorCode);
      });
    };
    cli.printHelp = function() {
      cli.printVersion();
      console.log('\n' + require('./opts/args').help() + '\n');
      console.log('Visit http://usejsdoc.org for more information.');
      return Promise.resolve(0);
    };
    cli.runTests = function() {
      var path = require('./path');
      var runner = Promise.promisify(require(path.join(env.dirname, 'test/runner')));
      console.log('Running tests...');
      return runner();
    };
    cli.getVersion = function() {
      return 'JSDoc ' + env.version.number + ' (' + env.version.revision + ')';
    };
    cli.printVersion = function() {
      console.log(cli.getVersion());
      return Promise.resolve(0);
    };
    cli.main = function() {
      cli.scanFiles();
      if (env.sourceFiles.length === 0) {
        console.log('There are no input files to process.\n');
        return cli.printHelp();
      } else {
        return cli.createParser().parseFiles().processParseResults().then(function() {
          env.run.finish = new Date();
          return 0;
        });
      }
    };
    function readPackageJson(filepath) {
      var fs = require('./fs');
      try {
        return stripJsonComments(fs.readFileSync(filepath, 'utf8'));
      } catch (e) {
        logger.error('Unable to read the package file "%s"', filepath);
        return null;
      }
    }
    function buildSourceList() {
      var fs = require('./fs');
      var Readme = require('./readme');
      var packageJson;
      var readmeHtml;
      var sourceFile;
      var sourceFiles = env.opts._ ? env.opts._.slice(0) : [];
      if (env.conf.source && env.conf.source.include) {
        sourceFiles = sourceFiles.concat(env.conf.source.include);
      }
      if (env.opts.package) {
        packageJson = readPackageJson(env.opts.package);
      }
      if (env.opts.readme) {
        readmeHtml = new Readme(env.opts.readme).html;
      }
      for (var i = 0,
          l = sourceFiles.length; i < l; i++) {
        sourceFile = sourceFiles[i];
        if (!env.opts.package && /\bpackage\.json$/i.test(sourceFile)) {
          packageJson = readPackageJson(sourceFile);
          sourceFiles.splice(i--, 1);
        }
        if (!env.opts.readme && /(\bREADME|\.md)$/i.test(sourceFile)) {
          readmeHtml = new Readme(sourceFile).html;
          sourceFiles.splice(i--, 1);
        }
      }
      props.packageJson = packageJson;
      env.opts.readme = readmeHtml;
      return sourceFiles;
    }
    cli.scanFiles = function() {
      var Filter = require('./src/filter').Filter;
      var filter;
      env.opts._ = buildSourceList();
      if (env.conf.source && env.opts._.length) {
        filter = new Filter(env.conf.source);
        env.sourceFiles = app.jsdoc.scanner.scan(env.opts._, (env.opts.recurse ? 10 : undefined), filter);
      }
      return cli;
    };
    function resolvePluginPaths(paths) {
      var path = require('./path');
      var pluginPaths = [];
      paths.forEach(function(plugin) {
        var basename = path.basename(plugin);
        var dirname = path.dirname(plugin);
        var pluginPath = path.getResourcePath(dirname);
        if (!pluginPath) {
          logger.error('Unable to find the plugin "%s"', plugin);
          return;
        }
        pluginPaths.push(path.join(pluginPath, basename));
      });
      return pluginPaths;
    }
    cli.createParser = function() {
      var handlers = require('./src/handlers');
      var parser = require('./src/parser');
      var path = require('./path');
      var plugins = require('./plugins');
      app.jsdoc.parser = parser.createParser(env.conf.parser);
      if (env.conf.plugins) {
        env.conf.plugins = resolvePluginPaths(env.conf.plugins);
        plugins.installPlugins(env.conf.plugins, app.jsdoc.parser);
      }
      handlers.attachTo(app.jsdoc.parser);
      return cli;
    };
    cli.parseFiles = function() {
      var augment = require('./augment');
      var borrow = require('./borrow');
      var Package = require('./package.json!systemjs-json').Package;
      var docs;
      var packageDocs;
      props.docs = docs = app.jsdoc.parser.parse(env.sourceFiles, env.opts.encoding);
      packageDocs = new Package(props.packageJson);
      packageDocs.files = env.sourceFiles || [];
      docs.push(packageDocs);
      logger.debug('Indexing doclets...');
      borrow.indexAll(docs);
      logger.debug('Adding inherited symbols, mixins, and interface implementations...');
      augment.augmentAll(docs);
      logger.debug('Adding borrowed doclets...');
      borrow.resolveBorrows(docs);
      logger.debug('Post-processing complete.');
      app.jsdoc.parser.fireProcessingComplete(docs);
      return cli;
    };
    cli.processParseResults = function() {
      if (env.opts.explain) {
        cli.dumpParseResults();
        return Promise.resolve();
      } else {
        cli.resolveTutorials();
        return cli.generateDocs();
      }
    };
    cli.dumpParseResults = function() {
      console.log(require('./util/dumper').dump(props.docs));
      return cli;
    };
    cli.resolveTutorials = function() {
      var resolver = require('./tutorial/resolver');
      if (env.opts.tutorials) {
        resolver.load(env.opts.tutorials);
        resolver.resolve();
      }
      return cli;
    };
    cli.generateDocs = function() {
      var path = require('./path');
      var resolver = require('./tutorial/resolver');
      var taffy = require('taffydb').taffy;
      var template;
      env.opts.template = (function() {
        var publish = env.opts.template || 'templates/default';
        var templatePath = path.getResourcePath(publish);
        return templatePath || env.opts.template;
      })();
      try {
        template = require(env.opts.template + '/publish');
      } catch (e) {
        logger.fatal('Unable to load template: ' + e.message || e);
      }
      if (template.publish && typeof template.publish === 'function') {
        logger.info('Generating output files...');
        var publishPromise = template.publish(taffy(props.docs), env.opts, resolver.root);
        return Promise.resolve(publishPromise);
      } else {
        logger.fatal(env.opts.template + ' does not export a "publish" function. Global ' + '"publish" functions are no longer supported.');
      }
      return Promise.resolve();
    };
    cli.exit = function(exitCode, message) {
      if (exitCode > 0) {
        if (message) {
          console.error(message);
        }
        process.exit(exitCode);
      }
    };
    return cli;
  })();
})(require('process'));
