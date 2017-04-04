/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.ScopeManager = exports.Scope = exports.Variable = exports.Reference = exports.version = undefined;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
exports.analyze = analyze;
var _assert = require('assert');
var _assert2 = _interopRequireDefault(_assert);
var _scopeManager = require('./scope-manager');
var _scopeManager2 = _interopRequireDefault(_scopeManager);
var _referencer = require('./referencer');
var _referencer2 = _interopRequireDefault(_referencer);
var _reference = require('./reference');
var _reference2 = _interopRequireDefault(_reference);
var _variable = require('./variable');
var _variable2 = _interopRequireDefault(_variable);
var _scope = require('./scope');
var _scope2 = _interopRequireDefault(_scope);
var _package = require('../package.json!systemjs-json');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function defaultOptions() {
  return {
    optimistic: false,
    directive: false,
    nodejsScope: false,
    impliedStrict: false,
    sourceType: 'script',
    ecmaVersion: 5,
    childVisitorKeys: null,
    fallback: 'iteration'
  };
}
function updateDeeply(target, override) {
  var key,
      val;
  function isHashObject(target) {
    return (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target instanceof Object && !(target instanceof Array) && !(target instanceof RegExp);
  }
  for (key in override) {
    if (override.hasOwnProperty(key)) {
      val = override[key];
      if (isHashObject(val)) {
        if (isHashObject(target[key])) {
          updateDeeply(target[key], val);
        } else {
          target[key] = updateDeeply({}, val);
        }
      } else {
        target[key] = val;
      }
    }
  }
  return target;
}
function analyze(tree, providedOptions) {
  var scopeManager,
      referencer,
      options;
  options = updateDeeply(defaultOptions(), providedOptions);
  scopeManager = new _scopeManager2.default(options);
  referencer = new _referencer2.default(options, scopeManager);
  referencer.visit(tree);
  (0, _assert2.default)(scopeManager.__currentScope === null, 'currentScope should be null.');
  return scopeManager;
}
exports.version = _package.version;
exports.Reference = _reference2.default;
exports.Variable = _variable2.default;
exports.Scope = _scope2.default;
exports.ScopeManager = _scopeManager2.default;
