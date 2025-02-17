/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 block scope', function() {
    it('let is materialized in ES6 block scope#1', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("{\n    let i = 20;\n    i;\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.references).to.have.length(2);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      return expect(scope.references[1].identifier.name).to.be.equal('i');
    });
    it('let is materialized in ES6 block scope#2', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("{\n    let i = 20;\n    var i = 20;\n    i;\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('i');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.references).to.have.length(3);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[1].identifier.name).to.be.equal('i');
      return expect(scope.references[2].identifier.name).to.be.equal('i');
    });
    it('function delaration is materialized in ES6 block scope', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("{\n    function test() {\n    }\n    test();\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(3);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('test');
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('test');
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      return expect(scope.references).to.have.length(0);
    });
    it('let is not hoistable#1', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("var i = 42; (1)\n{\n    i;  // (2) ReferenceError at runtime.\n    let i = 20;  // (2)\n    i;  // (2)\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(1);
      expect(globalScope.variables[0].name).to.be.equal('i');
      expect(globalScope.references).to.have.length(1);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.references).to.have.length(3);
      expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
      expect(scope.references[1].resolved).to.be.equal(scope.variables[0]);
      return expect(scope.references[2].resolved).to.be.equal(scope.variables[0]);
    });
    return it('let is not hoistable#2', function() {
      var ast,
          globalScope,
          scope,
          scopeManager,
          v1,
          v2,
          v3;
      ast = harmony.parse("(function () {\n    var i = 42; // (1)\n    i;  // (1)\n    {\n        i;  // (3)\n        {\n            i;  // (2)\n            let i = 20;  // (2)\n            i;  // (2)\n        }\n        let i = 30;  // (3)\n        i;  // (3)\n    }\n    i;  // (1)\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(4);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('i');
      v1 = scope.variables[1];
      expect(scope.references).to.have.length(3);
      expect(scope.references[0].resolved).to.be.equal(v1);
      expect(scope.references[1].resolved).to.be.equal(v1);
      expect(scope.references[2].resolved).to.be.equal(v1);
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('i');
      v3 = scope.variables[0];
      expect(scope.references).to.have.length(3);
      expect(scope.references[0].resolved).to.be.equal(v3);
      expect(scope.references[1].resolved).to.be.equal(v3);
      expect(scope.references[2].resolved).to.be.equal(v3);
      scope = scopeManager.scopes[3];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('i');
      v2 = scope.variables[0];
      expect(scope.references).to.have.length(3);
      expect(scope.references[0].resolved).to.be.equal(v2);
      expect(scope.references[1].resolved).to.be.equal(v2);
      return expect(scope.references[2].resolved).to.be.equal(v2);
    });
  });
}).call(this);
