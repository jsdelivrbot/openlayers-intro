/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 object', function() {
    it('method definition', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("({\n    constructor() {\n    }\n})");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('FunctionExpression');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      return expect(scope.references).to.have.length(0);
    });
    return it('computed property key may refer variables', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    var yuyushiki = 42;\n    ({\n        [yuyushiki]() {\n        },\n\n        [yuyushiki + 40]() {\n        }\n    })\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(4);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('FunctionExpression');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('yuyushiki');
      expect(scope.references).to.have.length(3);
      expect(scope.references[0].identifier.name).to.be.equal('yuyushiki');
      expect(scope.references[1].identifier.name).to.be.equal('yuyushiki');
      return expect(scope.references[2].identifier.name).to.be.equal('yuyushiki');
    });
  });
}).call(this);
