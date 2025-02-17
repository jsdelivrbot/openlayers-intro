/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 iteration scope', function() {
    it('let materialize iteration scope for ForInStatement#1', function() {
      var ast,
          iterScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    let i = 20;\n    for (let i in i) {\n        console.log(i);\n    }\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(5);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('i');
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
      iterScope = scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('TDZ');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.variables[0].defs[0].type).to.be.equal('TDZ');
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
      iterScope = scope = scopeManager.scopes[3];
      expect(scope.type).to.be.equal('for');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
      scope = scopeManager.scopes[4];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(2);
      expect(scope.references[0].identifier.name).to.be.equal('console');
      expect(scope.references[0].resolved).to.be.equal(null);
      expect(scope.references[1].identifier.name).to.be.equal('i');
      return expect(scope.references[1].resolved).to.be.equal(iterScope.variables[0]);
    });
    it('let materialize iteration scope for ForInStatement#2', function() {
      var ast,
          iterScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    let i = 20;\n    for (let { i, j, k } in i) {\n        console.log(i);\n    }\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(5);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('i');
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
      iterScope = scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('TDZ');
      expect(scope.variables).to.have.length(3);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.variables[0].defs[0].type).to.be.equal('TDZ');
      expect(scope.variables[1].name).to.be.equal('j');
      expect(scope.variables[1].defs[0].type).to.be.equal('TDZ');
      expect(scope.variables[2].name).to.be.equal('k');
      expect(scope.variables[2].defs[0].type).to.be.equal('TDZ');
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
      iterScope = scope = scopeManager.scopes[3];
      expect(scope.type).to.be.equal('for');
      expect(scope.variables).to.have.length(3);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.variables[1].name).to.be.equal('j');
      expect(scope.variables[2].name).to.be.equal('k');
      expect(scope.references).to.have.length(3);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
      expect(scope.references[1].identifier.name).to.be.equal('j');
      expect(scope.references[1].resolved).to.be.equal(scope.variables[1]);
      expect(scope.references[2].identifier.name).to.be.equal('k');
      expect(scope.references[2].resolved).to.be.equal(scope.variables[2]);
      scope = scopeManager.scopes[4];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(2);
      expect(scope.references[0].identifier.name).to.be.equal('console');
      expect(scope.references[0].resolved).to.be.equal(null);
      expect(scope.references[1].identifier.name).to.be.equal('i');
      return expect(scope.references[1].resolved).to.be.equal(iterScope.variables[0]);
    });
    return it('let materialize iteration scope for ForStatement#2', function() {
      var ast,
          functionScope,
          iterScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    let i = 20;\n    let obj = {};\n    for (let { i, j, k } = obj; i < okok; ++i) {\n        console.log(i, j, k);\n    }\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(4);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      functionScope = scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(3);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('i');
      expect(scope.variables[2].name).to.be.equal('obj');
      expect(scope.references).to.have.length(2);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
      expect(scope.references[1].identifier.name).to.be.equal('obj');
      expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
      iterScope = scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('for');
      expect(scope.variables).to.have.length(3);
      expect(scope.variables[0].name).to.be.equal('i');
      expect(scope.variables[0].defs[0].type).to.be.equal('Variable');
      expect(scope.variables[1].name).to.be.equal('j');
      expect(scope.variables[1].defs[0].type).to.be.equal('Variable');
      expect(scope.variables[2].name).to.be.equal('k');
      expect(scope.variables[2].defs[0].type).to.be.equal('Variable');
      expect(scope.references).to.have.length(7);
      expect(scope.references[0].identifier.name).to.be.equal('i');
      expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
      expect(scope.references[1].identifier.name).to.be.equal('j');
      expect(scope.references[1].resolved).to.be.equal(scope.variables[1]);
      expect(scope.references[2].identifier.name).to.be.equal('k');
      expect(scope.references[2].resolved).to.be.equal(scope.variables[2]);
      expect(scope.references[3].identifier.name).to.be.equal('obj');
      expect(scope.references[3].resolved).to.be.equal(functionScope.variables[2]);
      expect(scope.references[4].identifier.name).to.be.equal('i');
      expect(scope.references[4].resolved).to.be.equal(scope.variables[0]);
      expect(scope.references[5].identifier.name).to.be.equal('okok');
      expect(scope.references[5].resolved).to.be["null"];
      expect(scope.references[6].identifier.name).to.be.equal('i');
      expect(scope.references[6].resolved).to.be.equal(scope.variables[0]);
      scope = scopeManager.scopes[3];
      expect(scope.type).to.be.equal('block');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(4);
      expect(scope.references[0].identifier.name).to.be.equal('console');
      expect(scope.references[0].resolved).to.be["null"];
      expect(scope.references[1].identifier.name).to.be.equal('i');
      expect(scope.references[1].resolved).to.be.equal(iterScope.variables[0]);
      expect(scope.references[2].identifier.name).to.be.equal('j');
      expect(scope.references[2].resolved).to.be.equal(iterScope.variables[1]);
      expect(scope.references[3].identifier.name).to.be.equal('k');
      return expect(scope.references[3].resolved).to.be.equal(iterScope.variables[2]);
    });
  });
}).call(this);
