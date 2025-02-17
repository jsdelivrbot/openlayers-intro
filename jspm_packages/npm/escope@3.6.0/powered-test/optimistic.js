/* */ 
(function() {
  'use strict';
  var escope,
      esprima,
      expect;
  expect = require('chai').expect;
  escope = require('../lib/index');
  esprima = require('esprima');
  describe('optimistic', function() {
    it('direct call to eval', function() {
      var ast,
          scopes;
      ast = esprima.parse("function outer() {\n    eval(str);\n    var i = 20;\n    function inner() {\n        i;\n    }\n}");
      scopes = escope.analyze(ast, {optimistic: true}).scopes;
      return expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments', 'i', 'inner'], ['arguments']]);
    });
    return it('with statement', function() {
      var ast,
          scopes;
      ast = esprima.parse("function outer() {\n    eval(str);\n    var i = 20;\n    with (obj) {\n        i;\n    }\n}");
      scopes = escope.analyze(ast, {optimistic: true}).scopes;
      return expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments', 'i'], []]);
    });
  });
}).call(this);
