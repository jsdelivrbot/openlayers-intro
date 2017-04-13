/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.ClassScope = exports.ForScope = exports.FunctionScope = exports.SwitchScope = exports.BlockScope = exports.TDZScope = exports.WithScope = exports.CatchScope = exports.FunctionExpressionNameScope = exports.ModuleScope = exports.GlobalScope = undefined;
var _get = function get(object, property, receiver) {
  if (object === null)
    object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _estraverse = require('estraverse');
var _es6Map = require('es6-map');
var _es6Map2 = _interopRequireDefault(_es6Map);
var _reference = require('./reference');
var _reference2 = _interopRequireDefault(_reference);
var _variable = require('./variable');
var _variable2 = _interopRequireDefault(_variable);
var _definition = require('./definition');
var _definition2 = _interopRequireDefault(_definition);
var _assert = require('assert');
var _assert2 = _interopRequireDefault(_assert);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }});
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function isStrictScope(scope, block, isMethodDefinition, useDirective) {
  var body,
      i,
      iz,
      stmt,
      expr;
  if (scope.upper && scope.upper.isStrict) {
    return true;
  }
  if (block.type === _estraverse.Syntax.ArrowFunctionExpression) {
    return true;
  }
  if (isMethodDefinition) {
    return true;
  }
  if (scope.type === 'class' || scope.type === 'module') {
    return true;
  }
  if (scope.type === 'block' || scope.type === 'switch') {
    return false;
  }
  if (scope.type === 'function') {
    if (block.type === _estraverse.Syntax.Program) {
      body = block;
    } else {
      body = block.body;
    }
  } else if (scope.type === 'global') {
    body = block;
  } else {
    return false;
  }
  if (useDirective) {
    for (i = 0, iz = body.body.length; i < iz; ++i) {
      stmt = body.body[i];
      if (stmt.type !== _estraverse.Syntax.DirectiveStatement) {
        break;
      }
      if (stmt.raw === '"use strict"' || stmt.raw === '\'use strict\'') {
        return true;
      }
    }
  } else {
    for (i = 0, iz = body.body.length; i < iz; ++i) {
      stmt = body.body[i];
      if (stmt.type !== _estraverse.Syntax.ExpressionStatement) {
        break;
      }
      expr = stmt.expression;
      if (expr.type !== _estraverse.Syntax.Literal || typeof expr.value !== 'string') {
        break;
      }
      if (expr.raw != null) {
        if (expr.raw === '"use strict"' || expr.raw === '\'use strict\'') {
          return true;
        }
      } else {
        if (expr.value === 'use strict') {
          return true;
        }
      }
    }
  }
  return false;
}
function registerScope(scopeManager, scope) {
  var scopes;
  scopeManager.scopes.push(scope);
  scopes = scopeManager.__nodeToScope.get(scope.block);
  if (scopes) {
    scopes.push(scope);
  } else {
    scopeManager.__nodeToScope.set(scope.block, [scope]);
  }
}
function shouldBeStatically(def) {
  return def.type === _variable2.default.ClassName || def.type === _variable2.default.Variable && def.parent.kind !== 'var';
}
var Scope = function() {
  function Scope(scopeManager, type, upperScope, block, isMethodDefinition) {
    _classCallCheck(this, Scope);
    this.type = type;
    this.set = new _es6Map2.default();
    this.taints = new _es6Map2.default();
    this.dynamic = this.type === 'global' || this.type === 'with';
    this.block = block;
    this.through = [];
    this.variables = [];
    this.references = [];
    this.variableScope = this.type === 'global' || this.type === 'function' || this.type === 'module' ? this : upperScope.variableScope;
    this.functionExpressionScope = false;
    this.directCallToEvalScope = false;
    this.thisFound = false;
    this.__left = [];
    this.upper = upperScope;
    this.isStrict = isStrictScope(this, block, isMethodDefinition, scopeManager.__useDirective());
    this.childScopes = [];
    if (this.upper) {
      this.upper.childScopes.push(this);
    }
    this.__declaredVariables = scopeManager.__declaredVariables;
    registerScope(scopeManager, this);
  }
  _createClass(Scope, [{
    key: '__shouldStaticallyClose',
    value: function __shouldStaticallyClose(scopeManager) {
      return !this.dynamic || scopeManager.__isOptimistic();
    }
  }, {
    key: '__shouldStaticallyCloseForGlobal',
    value: function __shouldStaticallyCloseForGlobal(ref) {
      var name = ref.identifier.name;
      if (!this.set.has(name)) {
        return false;
      }
      var variable = this.set.get(name);
      var defs = variable.defs;
      return defs.length > 0 && defs.every(shouldBeStatically);
    }
  }, {
    key: '__staticCloseRef',
    value: function __staticCloseRef(ref) {
      if (!this.__resolve(ref)) {
        this.__delegateToUpperScope(ref);
      }
    }
  }, {
    key: '__dynamicCloseRef',
    value: function __dynamicCloseRef(ref) {
      var current = this;
      do {
        current.through.push(ref);
        current = current.upper;
      } while (current);
    }
  }, {
    key: '__globalCloseRef',
    value: function __globalCloseRef(ref) {
      if (this.__shouldStaticallyCloseForGlobal(ref)) {
        this.__staticCloseRef(ref);
      } else {
        this.__dynamicCloseRef(ref);
      }
    }
  }, {
    key: '__close',
    value: function __close(scopeManager) {
      var closeRef;
      if (this.__shouldStaticallyClose(scopeManager)) {
        closeRef = this.__staticCloseRef;
      } else if (this.type !== 'global') {
        closeRef = this.__dynamicCloseRef;
      } else {
        closeRef = this.__globalCloseRef;
      }
      for (var i = 0,
          iz = this.__left.length; i < iz; ++i) {
        var ref = this.__left[i];
        closeRef.call(this, ref);
      }
      this.__left = null;
      return this.upper;
    }
  }, {
    key: '__resolve',
    value: function __resolve(ref) {
      var variable,
          name;
      name = ref.identifier.name;
      if (this.set.has(name)) {
        variable = this.set.get(name);
        variable.references.push(ref);
        variable.stack = variable.stack && ref.from.variableScope === this.variableScope;
        if (ref.tainted) {
          variable.tainted = true;
          this.taints.set(variable.name, true);
        }
        ref.resolved = variable;
        return true;
      }
      return false;
    }
  }, {
    key: '__delegateToUpperScope',
    value: function __delegateToUpperScope(ref) {
      if (this.upper) {
        this.upper.__left.push(ref);
      }
      this.through.push(ref);
    }
  }, {
    key: '__addDeclaredVariablesOfNode',
    value: function __addDeclaredVariablesOfNode(variable, node) {
      if (node == null) {
        return;
      }
      var variables = this.__declaredVariables.get(node);
      if (variables == null) {
        variables = [];
        this.__declaredVariables.set(node, variables);
      }
      if (variables.indexOf(variable) === -1) {
        variables.push(variable);
      }
    }
  }, {
    key: '__defineGeneric',
    value: function __defineGeneric(name, set, variables, node, def) {
      var variable;
      variable = set.get(name);
      if (!variable) {
        variable = new _variable2.default(name, this);
        set.set(name, variable);
        variables.push(variable);
      }
      if (def) {
        variable.defs.push(def);
        if (def.type !== _variable2.default.TDZ) {
          this.__addDeclaredVariablesOfNode(variable, def.node);
          this.__addDeclaredVariablesOfNode(variable, def.parent);
        }
      }
      if (node) {
        variable.identifiers.push(node);
      }
    }
  }, {
    key: '__define',
    value: function __define(node, def) {
      if (node && node.type === _estraverse.Syntax.Identifier) {
        this.__defineGeneric(node.name, this.set, this.variables, node, def);
      }
    }
  }, {
    key: '__referencing',
    value: function __referencing(node, assign, writeExpr, maybeImplicitGlobal, partial, init) {
      if (!node || node.type !== _estraverse.Syntax.Identifier) {
        return;
      }
      if (node.name === 'super') {
        return;
      }
      var ref = new _reference2.default(node, this, assign || _reference2.default.READ, writeExpr, maybeImplicitGlobal, !!partial, !!init);
      this.references.push(ref);
      this.__left.push(ref);
    }
  }, {
    key: '__detectEval',
    value: function __detectEval() {
      var current;
      current = this;
      this.directCallToEvalScope = true;
      do {
        current.dynamic = true;
        current = current.upper;
      } while (current);
    }
  }, {
    key: '__detectThis',
    value: function __detectThis() {
      this.thisFound = true;
    }
  }, {
    key: '__isClosed',
    value: function __isClosed() {
      return this.__left === null;
    }
  }, {
    key: 'resolve',
    value: function resolve(ident) {
      var ref,
          i,
          iz;
      (0, _assert2.default)(this.__isClosed(), 'Scope should be closed.');
      (0, _assert2.default)(ident.type === _estraverse.Syntax.Identifier, 'Target should be identifier.');
      for (i = 0, iz = this.references.length; i < iz; ++i) {
        ref = this.references[i];
        if (ref.identifier === ident) {
          return ref;
        }
      }
      return null;
    }
  }, {
    key: 'isStatic',
    value: function isStatic() {
      return !this.dynamic;
    }
  }, {
    key: 'isArgumentsMaterialized',
    value: function isArgumentsMaterialized() {
      return true;
    }
  }, {
    key: 'isThisMaterialized',
    value: function isThisMaterialized() {
      return true;
    }
  }, {
    key: 'isUsedName',
    value: function isUsedName(name) {
      if (this.set.has(name)) {
        return true;
      }
      for (var i = 0,
          iz = this.through.length; i < iz; ++i) {
        if (this.through[i].identifier.name === name) {
          return true;
        }
      }
      return false;
    }
  }]);
  return Scope;
}();
exports.default = Scope;
var GlobalScope = exports.GlobalScope = function(_Scope) {
  _inherits(GlobalScope, _Scope);
  function GlobalScope(scopeManager, block) {
    _classCallCheck(this, GlobalScope);
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GlobalScope).call(this, scopeManager, 'global', null, block, false));
    _this.implicit = {
      set: new _es6Map2.default(),
      variables: [],
      left: []
    };
    return _this;
  }
  _createClass(GlobalScope, [{
    key: '__close',
    value: function __close(scopeManager) {
      var implicit = [];
      for (var i = 0,
          iz = this.__left.length; i < iz; ++i) {
        var ref = this.__left[i];
        if (ref.__maybeImplicitGlobal && !this.set.has(ref.identifier.name)) {
          implicit.push(ref.__maybeImplicitGlobal);
        }
      }
      for (var _i = 0,
          _iz = implicit.length; _i < _iz; ++_i) {
        var info = implicit[_i];
        this.__defineImplicit(info.pattern, new _definition2.default(_variable2.default.ImplicitGlobalVariable, info.pattern, info.node, null, null, null));
      }
      this.implicit.left = this.__left;
      return _get(Object.getPrototypeOf(GlobalScope.prototype), '__close', this).call(this, scopeManager);
    }
  }, {
    key: '__defineImplicit',
    value: function __defineImplicit(node, def) {
      if (node && node.type === _estraverse.Syntax.Identifier) {
        this.__defineGeneric(node.name, this.implicit.set, this.implicit.variables, node, def);
      }
    }
  }]);
  return GlobalScope;
}(Scope);
var ModuleScope = exports.ModuleScope = function(_Scope2) {
  _inherits(ModuleScope, _Scope2);
  function ModuleScope(scopeManager, upperScope, block) {
    _classCallCheck(this, ModuleScope);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(ModuleScope).call(this, scopeManager, 'module', upperScope, block, false));
  }
  return ModuleScope;
}(Scope);
var FunctionExpressionNameScope = exports.FunctionExpressionNameScope = function(_Scope3) {
  _inherits(FunctionExpressionNameScope, _Scope3);
  function FunctionExpressionNameScope(scopeManager, upperScope, block) {
    _classCallCheck(this, FunctionExpressionNameScope);
    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(FunctionExpressionNameScope).call(this, scopeManager, 'function-expression-name', upperScope, block, false));
    _this3.__define(block.id, new _definition2.default(_variable2.default.FunctionName, block.id, block, null, null, null));
    _this3.functionExpressionScope = true;
    return _this3;
  }
  return FunctionExpressionNameScope;
}(Scope);
var CatchScope = exports.CatchScope = function(_Scope4) {
  _inherits(CatchScope, _Scope4);
  function CatchScope(scopeManager, upperScope, block) {
    _classCallCheck(this, CatchScope);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(CatchScope).call(this, scopeManager, 'catch', upperScope, block, false));
  }
  return CatchScope;
}(Scope);
var WithScope = exports.WithScope = function(_Scope5) {
  _inherits(WithScope, _Scope5);
  function WithScope(scopeManager, upperScope, block) {
    _classCallCheck(this, WithScope);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(WithScope).call(this, scopeManager, 'with', upperScope, block, false));
  }
  _createClass(WithScope, [{
    key: '__close',
    value: function __close(scopeManager) {
      if (this.__shouldStaticallyClose(scopeManager)) {
        return _get(Object.getPrototypeOf(WithScope.prototype), '__close', this).call(this, scopeManager);
      }
      for (var i = 0,
          iz = this.__left.length; i < iz; ++i) {
        var ref = this.__left[i];
        ref.tainted = true;
        this.__delegateToUpperScope(ref);
      }
      this.__left = null;
      return this.upper;
    }
  }]);
  return WithScope;
}(Scope);
var TDZScope = exports.TDZScope = function(_Scope6) {
  _inherits(TDZScope, _Scope6);
  function TDZScope(scopeManager, upperScope, block) {
    _classCallCheck(this, TDZScope);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(TDZScope).call(this, scopeManager, 'TDZ', upperScope, block, false));
  }
  return TDZScope;
}(Scope);
var BlockScope = exports.BlockScope = function(_Scope7) {
  _inherits(BlockScope, _Scope7);
  function BlockScope(scopeManager, upperScope, block) {
    _classCallCheck(this, BlockScope);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(BlockScope).call(this, scopeManager, 'block', upperScope, block, false));
  }
  return BlockScope;
}(Scope);
var SwitchScope = exports.SwitchScope = function(_Scope8) {
  _inherits(SwitchScope, _Scope8);
  function SwitchScope(scopeManager, upperScope, block) {
    _classCallCheck(this, SwitchScope);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(SwitchScope).call(this, scopeManager, 'switch', upperScope, block, false));
  }
  return SwitchScope;
}(Scope);
var FunctionScope = exports.FunctionScope = function(_Scope9) {
  _inherits(FunctionScope, _Scope9);
  function FunctionScope(scopeManager, upperScope, block, isMethodDefinition) {
    _classCallCheck(this, FunctionScope);
    var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(FunctionScope).call(this, scopeManager, 'function', upperScope, block, isMethodDefinition));
    if (_this9.block.type !== _estraverse.Syntax.ArrowFunctionExpression) {
      _this9.__defineArguments();
    }
    return _this9;
  }
  _createClass(FunctionScope, [{
    key: 'isArgumentsMaterialized',
    value: function isArgumentsMaterialized() {
      if (this.block.type === _estraverse.Syntax.ArrowFunctionExpression) {
        return false;
      }
      if (!this.isStatic()) {
        return true;
      }
      var variable = this.set.get('arguments');
      (0, _assert2.default)(variable, 'Always have arguments variable.');
      return variable.tainted || variable.references.length !== 0;
    }
  }, {
    key: 'isThisMaterialized',
    value: function isThisMaterialized() {
      if (!this.isStatic()) {
        return true;
      }
      return this.thisFound;
    }
  }, {
    key: '__defineArguments',
    value: function __defineArguments() {
      this.__defineGeneric('arguments', this.set, this.variables, null, null);
      this.taints.set('arguments', true);
    }
  }]);
  return FunctionScope;
}(Scope);
var ForScope = exports.ForScope = function(_Scope10) {
  _inherits(ForScope, _Scope10);
  function ForScope(scopeManager, upperScope, block) {
    _classCallCheck(this, ForScope);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(ForScope).call(this, scopeManager, 'for', upperScope, block, false));
  }
  return ForScope;
}(Scope);
var ClassScope = exports.ClassScope = function(_Scope11) {
  _inherits(ClassScope, _Scope11);
  function ClassScope(scopeManager, upperScope, block) {
    _classCallCheck(this, ClassScope);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(ClassScope).call(this, scopeManager, 'class', upperScope, block, false));
  }
  return ClassScope;
}(Scope);
