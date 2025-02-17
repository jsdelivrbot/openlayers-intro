/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 rest arguments', function() {
    return it('materialize rest argument in scope', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("function foo(...bar) {\n    return bar;\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(1);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('bar');
      expect(scope.variables[1].defs[0].name.name).to.be.equal('bar');
      return expect(scope.variables[1].defs[0].rest).to.be["true"];
    });
  });
}).call(this);
