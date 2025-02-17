/* */ 
(function(process) {
  var fs = require('fs-extra');
  var path = require('path');
  var async = require('async');
  var browserify = require('browserify');
  var derequire = require('derequire');
  var pkg = require('../package.json!systemjs-json');
  var root = path.join(__dirname, '..');
  var buildDir = path.join(root, 'build', 'ol.ext');
  function getExternalModules() {
    return pkg.ext.map(function(item) {
      if (typeof item === 'string') {
        return {
          name: item,
          module: item,
          main: require.resolve(item),
          browserify: false
        };
      } else {
        return {
          module: item.module,
          name: item.name !== undefined ? item.name : item.module,
          main: require.resolve(item.module),
          browserify: item.browserify !== undefined ? item.browserify : false
        };
      }
    });
  }
  function wrapModule(mod, callback) {
    var wrap = function(code) {
      return 'goog.provide(\'ol.ext.' + mod.name + '\');\n' + '/** @typedef {function(*)} */\n' + 'ol.ext.' + mod.name + ';\n' + '(function() {\n' + 'var exports = {};\n' + 'var module = {exports: exports};\n' + 'var define;\n' + '/**\n' + ' * @fileoverview\n' + ' * @suppress {accessControls, ambiguousFunctionDecl, ' + 'checkDebuggerStatement, checkRegExp, checkTypes, checkVars, const, ' + 'constantProperty, deprecated, duplicate, es5Strict, ' + 'fileoverviewTags, missingProperties, nonStandardJsDocs, ' + 'strictModuleDepCheck, suspiciousCode, undefinedNames, ' + 'undefinedVars, unknownDefines, unusedLocalVariables, uselessCode, visibility}\n' + ' */\n' + code + '\n' + 'ol.ext.' + mod.name + ' = module.exports;\n' + '})();\n';
    };
    if (mod.browserify) {
      browserify(mod.main, {standalone: mod.name}).bundle(function(err, buf) {
        if (err) {
          callback(err);
          return;
        }
        callback(null, wrap(derequire(buf.toString())));
      });
    } else {
      fs.readFile(mod.main, function(err, data) {
        if (err) {
          callback(err);
          return;
        }
        callback(null, wrap(data.toString()));
      });
    }
  }
  function buildModules(modules, callback) {
    async.each(modules, function(mod, done) {
      var output = path.join(buildDir, mod.name) + '.js';
      async.waterfall([wrapModule.bind(null, mod), fs.outputFile.bind(fs, output)], done);
    }, callback);
  }
  function main(callback) {
    var modules = getExternalModules();
    buildModules(modules, callback);
  }
  if (require.main === module) {
    main(function(err) {
      if (err) {
        process.stderr.write(err.message + '\n');
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
  }
  module.exports = main;
})(require('process'));
