/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('import declaration', function() {
    it('should import names from source', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("import v from \"mod\";", {sourceType: 'module'});
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
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('v');
      expect(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
      return expect(scope.references).to.have.length(0);
    });
    it('should import namespaces', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("import * as ns from \"mod\";", {sourceType: 'module'});
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
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('ns');
      expect(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
      return expect(scope.references).to.have.length(0);
    });
    it('should import insided names#1', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("import {x} from \"mod\";", {sourceType: 'module'});
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
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('x');
      expect(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
      return expect(scope.references).to.have.length(0);
    });
    return it('should import insided names#2', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("import {x as v} from \"mod\";", {sourceType: 'module'});
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
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('v');
      expect(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
      return expect(scope.references).to.have.length(0);
    });
  });
}).call(this);
