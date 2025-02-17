/* */ 
(function() {
  'use strict';
  var escope,
      esprima,
      expect;
  expect = require('chai').expect;
  escope = require('../lib/index');
  esprima = require('esprima');
  describe('implicit global reference', function() {
    it('assignments global scope', function() {
      var ast,
          scopes;
      ast = esprima.parse("var x = 20;\nx = 300;");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.defs.map(function(def) {
            return def.type;
          });
        });
      })).to.be.eql([[['Variable']]]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql([]);
    });
    it('assignments global scope without definition', function() {
      var ast,
          scopes;
      ast = esprima.parse("x = 300;\nx = 300;");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.defs.map(function(def) {
            return def.type;
          });
        });
      })).to.be.eql([[]]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql(['x']);
    });
    it('assignments global scope without definition eval', function() {
      var ast,
          scopes;
      ast = esprima.parse("function inner() {\n    eval(str);\n    x = 300;\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.defs.map(function(def) {
            return def.type;
          });
        });
      })).to.be.eql([[['FunctionName']], [[]]]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql([]);
    });
    it('assignment leaks', function() {
      var ast,
          scopes;
      ast = esprima.parse("function outer() {\n    x = 20;\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments']]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql(['x']);
    });
    it('assignment doesn\'t leak', function() {
      var ast,
          scopes;
      ast = esprima.parse("function outer() {\n    function inner() {\n        x = 20;\n    }\n    var x;\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments', 'inner', 'x'], ['arguments']]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql([]);
    });
    it('for-in-statement leaks', function() {
      var ast,
          scopes;
      ast = esprima.parse("function outer() {\n    for (x in y) { }\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments']]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql(['x']);
    });
    return it('for-in-statement doesn\'t leaks', function() {
      var ast,
          scopes;
      ast = esprima.parse("function outer() {\n    function inner() {\n        for (x in y) { }\n    }\n    var x;\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments', 'inner', 'x'], ['arguments']]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql([]);
    });
  });
}).call(this);
