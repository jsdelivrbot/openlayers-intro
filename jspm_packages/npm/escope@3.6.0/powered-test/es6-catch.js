/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 catch', function() {
    return it('takes binding pattern', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("try {\n} catch ({ a, b, c, d }) {\n    let e = 20;\n    a;\n    b;\n    let c = 30;\n    c;\n    d;\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(4);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('block');
      expect(scope.block.type).to.be.equal('BlockStatement');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('catch');
      expect(scope.block.type).to.be.equal('CatchClause');
      return expect(scope.isStrict).to.be["false"];
    });
  });
}).call(this);
