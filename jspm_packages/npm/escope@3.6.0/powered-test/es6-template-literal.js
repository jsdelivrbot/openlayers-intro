/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 template literal', function() {
    return it('refer variables', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    let i, j, k;\n    function testing() { }\n    let template = testing`testing ${i} and ${j}`\n    return template;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(3);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('FunctionExpression');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(6);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('i');
      expect(scope.variables[2].name).to.be.equal('j');
      expect(scope.variables[3].name).to.be.equal('k');
      expect(scope.variables[4].name).to.be.equal('testing');
      expect(scope.variables[5].name).to.be.equal('template');
      expect(scope.references).to.have.length(5);
      expect(scope.references[0].identifier.name).to.be.equal('template');
      expect(scope.references[1].identifier.name).to.be.equal('testing');
      expect(scope.references[2].identifier.name).to.be.equal('i');
      expect(scope.references[3].identifier.name).to.be.equal('j');
      return expect(scope.references[4].identifier.name).to.be.equal('template');
    });
  });
}).call(this);
