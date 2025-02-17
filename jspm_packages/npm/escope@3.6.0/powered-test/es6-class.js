/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 class', function() {
    it('declaration name creates class scope', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("class Derived extends Base {\n    constructor() {\n    }\n}\nnew Derived();");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(3);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('Derived');
      expect(scope.references).to.have.length(2);
      expect(scope.references[0].identifier.name).to.be.equal('Base');
      expect(scope.references[1].identifier.name).to.be.equal('Derived');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('class');
      expect(scope.block.type).to.be.equal('ClassDeclaration');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('Derived');
      expect(scope.references).to.have.length(0);
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('FunctionExpression');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      return expect(scope.references).to.have.length(0);
    });
    it('declaration name creates class scope', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("class Base {\n    constructor() {\n    }\n}\nlet foo = new Base();");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(3);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('Base');
      expect(scope.variables[1].name).to.be.equal('foo');
      expect(scope.through).to.have.length(0);
      expect(scope.references).to.have.length(2);
      expect(scope.references[0].identifier.name).to.be.equal('foo');
      expect(scope.references[1].identifier.name).to.be.equal('Base');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('class');
      expect(scope.block.type).to.be.equal('ClassDeclaration');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      console.dir(scope.variables);
      expect(scope.variables[0].name).to.be.equal('Base');
      expect(scope.references).to.have.length(0);
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('FunctionExpression');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      return expect(scope.references).to.have.length(0);
    });
    it('expression name creates class scope#1', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("(class Derived extends Base {\n    constructor() {\n    }\n});");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(3);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('Base');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('class');
      expect(scope.block.type).to.be.equal('ClassExpression');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('Derived');
      expect(scope.references).to.have.length(0);
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('function');
      return expect(scope.block.type).to.be.equal('FunctionExpression');
    });
    it('expression name creates class scope#2', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("(class extends Base {\n    constructor() {\n    }\n});");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(3);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('Base');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('class');
      expect(scope.block.type).to.be.equal('ClassExpression');
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('function');
      return expect(scope.block.type).to.be.equal('FunctionExpression');
    });
    return it('computed property key may refer variables', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    var yuyushiki = 42;\n    (class {\n        [yuyushiki]() {\n        }\n\n        [yuyushiki + 40]() {\n        }\n    });\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(5);
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
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('yuyushiki');
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('class');
      expect(scope.block.type).to.be.equal('ClassExpression');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(2);
      expect(scope.references[0].identifier.name).to.be.equal('yuyushiki');
      return expect(scope.references[1].identifier.name).to.be.equal('yuyushiki');
    });
  });
}).call(this);
