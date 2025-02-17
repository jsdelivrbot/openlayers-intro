/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 destructuring assignments', function() {
    it('Pattern in var in ForInStatement', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    for (var [a, b, c] in array);\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('array');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(4);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('a');
      expect(scope.variables[2].name).to.be.equal('b');
      expect(scope.variables[3].name).to.be.equal('c');
      expect(scope.references).to.have.length(4);
      expect(scope.references[0].identifier.name).to.be.equal('a');
      expect(scope.references[0].isWrite()).to.be["true"];
      expect(scope.references[0].partial).to.be["true"];
      expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
      expect(scope.references[1].identifier.name).to.be.equal('b');
      expect(scope.references[1].isWrite()).to.be["true"];
      expect(scope.references[1].partial).to.be["true"];
      expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
      expect(scope.references[2].identifier.name).to.be.equal('c');
      expect(scope.references[2].isWrite()).to.be["true"];
      expect(scope.references[2].partial).to.be["true"];
      expect(scope.references[2].resolved).to.be.equal(scope.variables[3]);
      expect(scope.references[3].identifier.name).to.be.equal('array');
      return expect(scope.references[3].isWrite()).to.be["false"];
    });
    it('ArrayPattern in var', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    var [a, b, c] = array;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('array');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(4);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('a');
      expect(scope.variables[2].name).to.be.equal('b');
      expect(scope.variables[3].name).to.be.equal('c');
      expect(scope.references).to.have.length(4);
      expect(scope.references[0].identifier.name).to.be.equal('a');
      expect(scope.references[0].isWrite()).to.be["true"];
      expect(scope.references[0].partial).to.be["true"];
      expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
      expect(scope.references[1].identifier.name).to.be.equal('b');
      expect(scope.references[1].isWrite()).to.be["true"];
      expect(scope.references[1].partial).to.be["true"];
      expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
      expect(scope.references[2].identifier.name).to.be.equal('c');
      expect(scope.references[2].isWrite()).to.be["true"];
      expect(scope.references[2].partial).to.be["true"];
      expect(scope.references[2].resolved).to.be.equal(scope.variables[3]);
      expect(scope.references[3].identifier.name).to.be.equal('array');
      return expect(scope.references[3].isWrite()).to.be["false"];
    });
    it('SpreadElement in var', function() {
      var ast,
          globalScope,
          index,
          name,
          scope,
          scopeManager,
          _i,
          _j,
          _len,
          _len1,
          _ref,
          _ref1;
      ast = harmony.parse("(function () {\n    var [a, b, ...rest] = array;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('array');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(4);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('a');
      expect(scope.variables[2].name).to.be.equal('b');
      expect(scope.variables[3].name).to.be.equal('rest');
      expect(scope.references).to.have.length(4);
      expect(scope.references[0].identifier.name).to.be.equal('a');
      expect(scope.references[0].isWrite()).to.be["true"];
      expect(scope.references[0].partial).to.be["true"];
      expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
      expect(scope.references[1].identifier.name).to.be.equal('b');
      expect(scope.references[1].isWrite()).to.be["true"];
      expect(scope.references[1].partial).to.be["true"];
      expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
      expect(scope.references[2].identifier.name).to.be.equal('rest');
      expect(scope.references[2].isWrite()).to.be["true"];
      expect(scope.references[2].partial).to.be["true"];
      expect(scope.references[2].resolved).to.be.equal(scope.variables[3]);
      expect(scope.references[3].identifier.name).to.be.equal('array');
      expect(scope.references[3].isWrite()).to.be["false"];
      ast = harmony.parse("(function () {\n    var [a, b, ...[c, d, ...rest]] = array;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('array');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(6);
      _ref = ['arguments', 'a', 'b', 'c', 'd', 'rest'];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        name = _ref[index];
        expect(scope.variables[index].name).to.be.equal(name);
      }
      expect(scope.references).to.have.length(6);
      _ref1 = ['a', 'b', 'c', 'd', 'rest'];
      for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
        name = _ref1[index];
        expect(scope.references[index].identifier.name).to.be.equal(name);
        expect(scope.references[index].isWrite()).to.be["true"];
        expect(scope.references[index].partial).to.be["true"];
      }
      expect(scope.references[5].identifier.name).to.be.equal('array');
      return expect(scope.references[5].isWrite()).to.be["false"];
    });
    it('ObjectPattern in var', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    var {\n        shorthand,\n        key: value,\n        hello: {\n            world\n        }\n    } = object;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('object');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(4);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('shorthand');
      expect(scope.variables[2].name).to.be.equal('value');
      expect(scope.variables[3].name).to.be.equal('world');
      expect(scope.references).to.have.length(4);
      expect(scope.references[0].identifier.name).to.be.equal('shorthand');
      expect(scope.references[0].isWrite()).to.be["true"];
      expect(scope.references[0].partial).to.be["true"];
      expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
      expect(scope.references[1].identifier.name).to.be.equal('value');
      expect(scope.references[1].isWrite()).to.be["true"];
      expect(scope.references[1].partial).to.be["true"];
      expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
      expect(scope.references[2].identifier.name).to.be.equal('world');
      expect(scope.references[2].isWrite()).to.be["true"];
      expect(scope.references[2].partial).to.be["true"];
      expect(scope.references[2].resolved).to.be.equal(scope.variables[3]);
      expect(scope.references[3].identifier.name).to.be.equal('object');
      return expect(scope.references[3].isWrite()).to.be["false"];
    });
    it('complex pattern in var', function() {
      var ast,
          globalScope,
          index,
          name,
          scope,
          scopeManager,
          _i,
          _j,
          _len,
          _len1,
          _ref,
          _ref1;
      ast = harmony.parse("(function () {\n    var {\n        shorthand,\n        key: [ a, b, c, d, e ],\n        hello: {\n            world\n        }\n    } = object;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('object');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(8);
      _ref = ['arguments', 'shorthand', 'a', 'b', 'c', 'd', 'e', 'world'];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        name = _ref[index];
        expect(scope.variables[index].name).to.be.equal(name);
      }
      expect(scope.references).to.have.length(8);
      _ref1 = ['shorthand', 'a', 'b', 'c', 'd', 'e', 'world'];
      for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
        name = _ref1[index];
        expect(scope.references[index].identifier.name).to.be.equal(name);
        expect(scope.references[index].isWrite()).to.be["true"];
        expect(scope.references[index].partial).to.be["true"];
      }
      expect(scope.references[7].identifier.name).to.be.equal('object');
      return expect(scope.references[7].isWrite()).to.be["false"];
    });
    it('ArrayPattern in AssignmentExpression', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    [a, b, c] = array;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(4);
      expect(scope.implicit.left.map((function(_this) {
        return function(ref) {
          return ref.identifier.name;
        };
      })(this))).to.deep.equal(['a', 'b', 'c', 'array']);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.references).to.have.length(4);
      expect(scope.references[0].identifier.name).to.be.equal('a');
      expect(scope.references[0].isWrite()).to.be["true"];
      expect(scope.references[0].partial).to.be["true"];
      expect(scope.references[0].resolved).to.be["null"];
      expect(scope.references[1].identifier.name).to.be.equal('b');
      expect(scope.references[1].isWrite()).to.be["true"];
      expect(scope.references[1].partial).to.be["true"];
      expect(scope.references[1].resolved).to.be["null"];
      expect(scope.references[2].identifier.name).to.be.equal('c');
      expect(scope.references[2].isWrite()).to.be["true"];
      expect(scope.references[2].partial).to.be["true"];
      expect(scope.references[2].resolved).to.be["null"];
      expect(scope.references[3].identifier.name).to.be.equal('array');
      return expect(scope.references[3].isWrite()).to.be["false"];
    });
    it('SpreadElement in AssignmentExpression', function() {
      var ast,
          globalScope,
          index,
          name,
          scope,
          scopeManager,
          _i,
          _len,
          _ref;
      ast = harmony.parse("(function () {\n    [a, b, ...rest] = array;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(4);
      expect(scope.implicit.left.map((function(_this) {
        return function(ref) {
          return ref.identifier.name;
        };
      })(this))).to.deep.equal(['a', 'b', 'rest', 'array']);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.references).to.have.length(4);
      expect(scope.references[0].identifier.name).to.be.equal('a');
      expect(scope.references[0].isWrite()).to.be["true"];
      expect(scope.references[0].partial).to.be["true"];
      expect(scope.references[0].resolved).to.be["null"];
      expect(scope.references[1].identifier.name).to.be.equal('b');
      expect(scope.references[1].isWrite()).to.be["true"];
      expect(scope.references[1].partial).to.be["true"];
      expect(scope.references[1].resolved).to.be["null"];
      expect(scope.references[2].identifier.name).to.be.equal('rest');
      expect(scope.references[2].isWrite()).to.be["true"];
      expect(scope.references[2].partial).to.be["true"];
      expect(scope.references[2].resolved).to.be["null"];
      expect(scope.references[3].identifier.name).to.be.equal('array');
      expect(scope.references[3].isWrite()).to.be["false"];
      ast = harmony.parse("(function () {\n    [a, b, ...[c, d, ...rest]] = array;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(6);
      expect(scope.implicit.left.map((function(_this) {
        return function(ref) {
          return ref.identifier.name;
        };
      })(this))).to.deep.equal(['a', 'b', 'c', 'd', 'rest', 'array']);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.references).to.have.length(6);
      _ref = ['a', 'b', 'c', 'd', 'rest'];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        name = _ref[index];
        expect(scope.references[index].identifier.name).to.be.equal(name);
        expect(scope.references[index].isWrite()).to.be["true"];
        expect(scope.references[index].partial).to.be["true"];
        expect(scope.references[index].resolved).to.be["null"];
      }
      expect(scope.references[5].identifier.name).to.be.equal('array');
      return expect(scope.references[5].isWrite()).to.be["false"];
    });
    it('ObjectPattern in AssignmentExpression', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function () {\n    ({\n        shorthand,\n        key: value,\n        hello: {\n            world\n        }\n    }) = object;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(4);
      expect(scope.implicit.left.map((function(_this) {
        return function(ref) {
          return ref.identifier.name;
        };
      })(this))).to.deep.equal(['shorthand', 'value', 'world', 'object']);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.references).to.have.length(4);
      expect(scope.references[0].identifier.name).to.be.equal('shorthand');
      expect(scope.references[0].isWrite()).to.be["true"];
      expect(scope.references[0].partial).to.be["true"];
      expect(scope.references[0].resolved).to["null"];
      expect(scope.references[1].identifier.name).to.be.equal('value');
      expect(scope.references[1].isWrite()).to.be["true"];
      expect(scope.references[1].partial).to.be["true"];
      expect(scope.references[1].resolved).to["null"];
      expect(scope.references[2].identifier.name).to.be.equal('world');
      expect(scope.references[2].isWrite()).to.be["true"];
      expect(scope.references[2].partial).to.be["true"];
      expect(scope.references[2].resolved).to["null"];
      expect(scope.references[3].identifier.name).to.be.equal('object');
      return expect(scope.references[3].isWrite()).to.be["false"];
    });
    it('complex pattern in AssignmentExpression', function() {
      var ast,
          globalScope,
          index,
          name,
          scope,
          scopeManager,
          _i,
          _len,
          _ref;
      ast = harmony.parse("(function () {\n    ({\n        shorthand,\n        key: [ a, b, c, d, e ],\n        hello: {\n            world\n        }\n    }) = object;\n}());");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(0);
      expect(scope.implicit.left).to.have.length(8);
      expect(scope.implicit.left.map((function(_this) {
        return function(ref) {
          return ref.identifier.name;
        };
      })(this))).to.deep.equal(['shorthand', 'a', 'b', 'c', 'd', 'e', 'world', 'object']);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.references).to.have.length(8);
      _ref = ['shorthand', 'a', 'b', 'c', 'd', 'e', 'world'];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        name = _ref[index];
        expect(scope.references[index].identifier.name).to.be.equal(name);
        expect(scope.references[index].isWrite()).to.be["true"];
        expect(scope.references[index].partial).to.be["true"];
      }
      expect(scope.references[7].identifier.name).to.be.equal('object');
      return expect(scope.references[7].isWrite()).to.be["false"];
    });
    it('ArrayPattern in parameters', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function ([a, b, c]) {\n}(array));");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('array');
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('array');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(4);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('a');
      expect(scope.variables[2].name).to.be.equal('b');
      expect(scope.variables[3].name).to.be.equal('c');
      return expect(scope.references).to.have.length(0);
    });
    it('SpreadElement in parameters', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function ([a, b, ...rest], ...rest2) {\n}(array));");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('array');
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('array');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(5);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('a');
      expect(scope.variables[2].name).to.be.equal('b');
      expect(scope.variables[3].name).to.be.equal('rest');
      expect(scope.variables[3].defs[0].rest).to.be["false"];
      expect(scope.variables[4].name).to.be.equal('rest2');
      expect(scope.variables[4].defs[0].rest).to.be["true"];
      return expect(scope.references).to.have.length(0);
    });
    it('ObjectPattern in parameters', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = harmony.parse("(function ({\n        shorthand,\n        key: value,\n        hello: {\n            world\n        }\n    }) {\n}(object));");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('object');
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('object');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(4);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('shorthand');
      expect(scope.variables[2].name).to.be.equal('value');
      expect(scope.variables[3].name).to.be.equal('world');
      return expect(scope.references).to.have.length(0);
    });
    return it('complex pattern in parameters', function() {
      var ast,
          globalScope,
          index,
          name,
          scope,
          scopeManager,
          _i,
          _len,
          _ref;
      ast = harmony.parse("(function ({\n        shorthand,\n        key: [ a, b, c, d, e ],\n        hello: {\n            world\n        }\n    }) {\n}(object));");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      globalScope = scope;
      expect(scope.type).to.be.equal('global');
      expect(scope.variables).to.have.length(0);
      expect(scope.references).to.have.length(1);
      expect(scope.references[0].identifier.name).to.be.equal('object');
      expect(scope.implicit.left).to.have.length(1);
      expect(scope.implicit.left[0].identifier.name).to.be.equal('object');
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(8);
      _ref = ['arguments', 'shorthand', 'a', 'b', 'c', 'd', 'e', 'world'];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        name = _ref[index];
        expect(scope.variables[index].name).to.be.equal(name);
      }
      return expect(scope.references).to.have.length(0);
    });
  });
}).call(this);
