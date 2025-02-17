/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('export declaration', function() {
    it('should create vairable bindings', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export var v;", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('v');
      expect(scope.variables[0].defs[0].type).to.be.equal('Variable');
      return expect(scope.references).to.have.length(0);
    });
    it('should create function declaration bindings', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export default function f(){};", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(3);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('f');
      expect(scope.variables[0].defs[0].type).to.be.equal('FunctionName');
      expect(scope.references).to.have.length(0);
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      return expect(scope.references).to.have.length(0);
    });
    it('should export function expression', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export default function(){};", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(3);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      return expect(scope.references).to.have.length(0);
    });
    it('should export literal', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export default 42;", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(0);
      return expect(scope.references).to.have.length(0);
    });
    it('should refer exported references#1', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export {x};", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      return expect(scope.references[0].identifier.name).to.be.equal('x');
    });
    it('should refer exported references#2', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export {v as x};", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      return expect(scope.references[0].identifier.name).to.be.equal('v');
    });
    it('should not refer exported references from other source#1', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export {x} from \"mod\";", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(0);
      return expect(scope.references).to.have.length(0);
    });
    it('should not refer exported references from other source#2', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export {v as x} from \"mod\";", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(0);
      return expect(scope.references).to.have.length(0);
    });
    return it('should not refer exported references from other source#3', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("export * from \"mod\";", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(0);
      return expect(scope.references).to.have.length(0);
    });
  });
}).call(this);
