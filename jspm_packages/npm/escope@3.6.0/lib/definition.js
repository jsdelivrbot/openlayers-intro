/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.Definition = exports.ParameterDefinition = undefined;
var _variable = require('./variable');
var _variable2 = _interopRequireDefault(_variable);
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
var Definition = function Definition(type, name, node, parent, index, kind) {
  _classCallCheck(this, Definition);
  this.type = type;
  this.name = name;
  this.node = node;
  this.parent = parent;
  this.index = index;
  this.kind = kind;
};
exports.default = Definition;
var ParameterDefinition = function(_Definition) {
  _inherits(ParameterDefinition, _Definition);
  function ParameterDefinition(name, node, index, rest) {
    _classCallCheck(this, ParameterDefinition);
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ParameterDefinition).call(this, _variable2.default.Parameter, name, node, null, index, null));
    _this.rest = rest;
    return _this;
  }
  return ParameterDefinition;
}(Definition);
exports.ParameterDefinition = ParameterDefinition;
exports.Definition = Definition;
