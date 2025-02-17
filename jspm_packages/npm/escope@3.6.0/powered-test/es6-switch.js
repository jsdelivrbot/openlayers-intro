/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 switch', function() {
    return it('materialize scope', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("switch (ok) {\n    case hello:\n        let i = 20;\n        i;\n        break;\n\n    default:\n        let test = 30;\n        test;\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('ok');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('switch');
      expect(scope.block.type).to.be.equal('SwitchStatement');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.variables[1].name).to.be.equal('test');
      expect(scope.references).to.have.length(5);
      expect(scope.references[0].identifier.name).to.be.equal('hello');
      expect(scope.references[1].identifier.name).to.be.equal('i');
      expect(scope.references[2].identifier.name).to.be.equal('i');
      expect(scope.references[3].identifier.name).to.be.equal('test');
      return expect(scope.references[4].identifier.name).to.be.equal('test');
    });
  });
}).call(this);
