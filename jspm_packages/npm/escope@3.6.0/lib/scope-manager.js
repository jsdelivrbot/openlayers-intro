/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
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
var _es6WeakMap = require('es6-weak-map');
var _es6WeakMap2 = _interopRequireDefault(_es6WeakMap);
var _scope = require('./scope');
var _scope2 = _interopRequireDefault(_scope);
var _assert = require('assert');
var _assert2 = _interopRequireDefault(_assert);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var ScopeManager = function() {
  function ScopeManager(options) {
    _classCallCheck(this, ScopeManager);
    this.scopes = [];
    this.globalScope = null;
    this.__nodeToScope = new _es6WeakMap2.default();
    this.__currentScope = null;
    this.__options = options;
    this.__declaredVariables = new _es6WeakMap2.default();
  }
  _createClass(ScopeManager, [{
    key: '__useDirective',
    value: function __useDirective() {
      return this.__options.directive;
    }
  }, {
    key: '__isOptimistic',
    value: function __isOptimistic() {
      return this.__options.optimistic;
    }
  }, {
    key: '__ignoreEval',
    value: function __ignoreEval() {
      return this.__options.ignoreEval;
    }
  }, {
    key: '__isNodejsScope',
    value: function __isNodejsScope() {
      return this.__options.nodejsScope;
    }
  }, {
    key: 'isModule',
    value: function isModule() {
      return this.__options.sourceType === 'module';
    }
  }, {
    key: 'isImpliedStrict',
    value: function isImpliedStrict() {
      return this.__options.impliedStrict;
    }
  }, {
    key: 'isStrictModeSupported',
    value: function isStrictModeSupported() {
      return this.__options.ecmaVersion >= 5;
    }
  }, {
    key: '__get',
    value: function __get(node) {
      return this.__nodeToScope.get(node);
    }
  }, {
    key: 'getDeclaredVariables',
    value: function getDeclaredVariables(node) {
      return this.__declaredVariables.get(node) || [];
    }
  }, {
    key: 'acquire',
    value: function acquire(node, inner) {
      var scopes,
          scope,
          i,
          iz;
      function predicate(scope) {
        if (scope.type === 'function' && scope.functionExpressionScope) {
          return false;
        }
        if (scope.type === 'TDZ') {
          return false;
        }
        return true;
      }
      scopes = this.__get(node);
      if (!scopes || scopes.length === 0) {
        return null;
      }
      if (scopes.length === 1) {
        return scopes[0];
      }
      if (inner) {
        for (i = scopes.length - 1; i >= 0; --i) {
          scope = scopes[i];
          if (predicate(scope)) {
            return scope;
          }
        }
      } else {
        for (i = 0, iz = scopes.length; i < iz; ++i) {
          scope = scopes[i];
          if (predicate(scope)) {
            return scope;
          }
        }
      }
      return null;
    }
  }, {
    key: 'acquireAll',
    value: function acquireAll(node) {
      return this.__get(node);
    }
  }, {
    key: 'release',
    value: function release(node, inner) {
      var scopes,
          scope;
      scopes = this.__get(node);
      if (scopes && scopes.length) {
        scope = scopes[0].upper;
        if (!scope) {
          return null;
        }
        return this.acquire(scope.block, inner);
      }
      return null;
    }
  }, {
    key: 'attach',
    value: function attach() {}
  }, {
    key: 'detach',
    value: function detach() {}
  }, {
    key: '__nestScope',
    value: function __nestScope(scope) {
      if (scope instanceof _scope.GlobalScope) {
        (0, _assert2.default)(this.__currentScope === null);
        this.globalScope = scope;
      }
      this.__currentScope = scope;
      return scope;
    }
  }, {
    key: '__nestGlobalScope',
    value: function __nestGlobalScope(node) {
      return this.__nestScope(new _scope.GlobalScope(this, node));
    }
  }, {
    key: '__nestBlockScope',
    value: function __nestBlockScope(node, isMethodDefinition) {
      return this.__nestScope(new _scope.BlockScope(this, this.__currentScope, node));
    }
  }, {
    key: '__nestFunctionScope',
    value: function __nestFunctionScope(node, isMethodDefinition) {
      return this.__nestScope(new _scope.FunctionScope(this, this.__currentScope, node, isMethodDefinition));
    }
  }, {
    key: '__nestForScope',
    value: function __nestForScope(node) {
      return this.__nestScope(new _scope.ForScope(this, this.__currentScope, node));
    }
  }, {
    key: '__nestCatchScope',
    value: function __nestCatchScope(node) {
      return this.__nestScope(new _scope.CatchScope(this, this.__currentScope, node));
    }
  }, {
    key: '__nestWithScope',
    value: function __nestWithScope(node) {
      return this.__nestScope(new _scope.WithScope(this, this.__currentScope, node));
    }
  }, {
    key: '__nestClassScope',
    value: function __nestClassScope(node) {
      return this.__nestScope(new _scope.ClassScope(this, this.__currentScope, node));
    }
  }, {
    key: '__nestSwitchScope',
    value: function __nestSwitchScope(node) {
      return this.__nestScope(new _scope.SwitchScope(this, this.__currentScope, node));
    }
  }, {
    key: '__nestModuleScope',
    value: function __nestModuleScope(node) {
      return this.__nestScope(new _scope.ModuleScope(this, this.__currentScope, node));
    }
  }, {
    key: '__nestTDZScope',
    value: function __nestTDZScope(node) {
      return this.__nestScope(new _scope.TDZScope(this, this.__currentScope, node));
    }
  }, {
    key: '__nestFunctionExpressionNameScope',
    value: function __nestFunctionExpressionNameScope(node) {
      return this.__nestScope(new _scope.FunctionExpressionNameScope(this, this.__currentScope, node));
    }
  }, {
    key: '__isES6',
    value: function __isES6() {
      return this.__options.ecmaVersion >= 6;
    }
  }]);
  return ScopeManager;
}();
exports.default = ScopeManager;
