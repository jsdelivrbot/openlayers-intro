/* */ 
'use strict';
var _ = require('underscore-contrib');
var ARRAY = 'array';
var BOOLEAN = 'boolean';
var OBJECT = 'object';
var STRING = 'string';
var UNDEFINED = 'undefined';
var TYPES = require('./types');
var TYPE_NAMES = _.values(TYPES);
module.exports = {
  id: '#parsedType',
  type: [OBJECT, UNDEFINED],
  additionalProperties: false,
  properties: {
    type: {
      type: STRING,
      enum: TYPE_NAMES
    },
    key: {'$ref': '#parsedType'},
    value: {'$ref': '#parsedType'},
    params: {
      type: ARRAY,
      items: {'$ref': '#parsedType'}
    },
    'new': {'$ref': '#parsedType'},
    'this': {'$ref': '#parsedType'},
    result: {'$ref': '#parsedType'},
    name: STRING,
    fields: {
      type: ARRAY,
      items: {'$ref': '#parsedType'}
    },
    expression: {'$ref': '#parsedType'},
    applications: {
      type: ARRAY,
      minItems: 1,
      maxItems: 2,
      items: {'$ref': '#parsedType'}
    },
    elements: {
      type: ARRAY,
      minItems: 1,
      items: {'$ref': '#parsedType'}
    },
    optional: BOOLEAN,
    nullable: BOOLEAN,
    repeatable: BOOLEAN,
    reservedWord: BOOLEAN
  },
  required: ['type']
};
