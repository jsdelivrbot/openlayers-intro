/* */ 
(function() {
  var escope,
      esprima,
      expect,
      harmony;
  expect = require('chai').expect;
  esprima = require('esprima');
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('function name', function() {
    return it('should create its special scope', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = esprima.parse("(function name() {\n}());");
      scopeManager = escope.analyze(ast);
      expect(scopeManager.scopes).to.have.length(3);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      expect(globalScope.isArgumentsMaterialized()).to.be["true"];
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function-expression-name');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('name');
      expect(scope.isArgumentsMaterialized()).to.be["true"];
      expect(scope.references).to.have.length(0);
      expect(scope.upper === globalScope).to.be["true"];
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.isArgumentsMaterialized()).to.be["false"];
      expect(scope.references).to.have.length(0);
      return expect(scope.upper === scopeManager.scopes[1]).to.be["true"];
    });
  });
}).call(this);
