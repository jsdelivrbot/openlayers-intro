/* */ 
'use strict';
var common = require('../common');
var Type = require('../type');
var YAML_FLOAT_PATTERN = new RegExp('^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' + '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' + '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' + '|[-+]?\\.(?:inf|Inf|INF)' + '|\\.(?:nan|NaN|NAN))$');
function resolveYamlFloat(data) {
  if (data === null)
    return false;
  if (!YAML_FLOAT_PATTERN.test(data))
    return false;
  return true;
}
function constructYamlFloat(data) {
  var value,
      sign,
      base,
      digits;
  value = data.replace(/_/g, '').toLowerCase();
  sign = value[0] === '-' ? -1 : 1;
  digits = [];
  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === '.nan') {
    return NaN;
  } else if (value.indexOf(':') >= 0) {
    value.split(':').forEach(function(v) {
      digits.unshift(parseFloat(v, 10));
    });
    value = 0.0;
    base = 1;
    digits.forEach(function(d) {
      value += d * base;
      base *= 60;
    });
    return sign * value;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case 'lowercase':
        return '.nan';
      case 'uppercase':
        return '.NAN';
      case 'camelcase':
        return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase':
        return '.inf';
      case 'uppercase':
        return '.INF';
      case 'camelcase':
        return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase':
        return '-.inf';
      case 'uppercase':
        return '-.INF';
      case 'camelcase':
        return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}
function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') && (object % 1 !== 0 || common.isNegativeZero(object));
}
module.exports = new Type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});
