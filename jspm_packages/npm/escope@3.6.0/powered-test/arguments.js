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
  describe('arguments', function() {
    return it('arguments are correctly materialized', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = esprima.parse("(function () {\n    arguments;\n}());");
      scopeManager = escope.analyze(ast);
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.isArgumentsMaterialized()).to.be["true"];
      expect(scope.references).to.have.length(1);
      return expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
    });
  });
}).call(this);
