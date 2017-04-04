/* */ 
'use strict';
var Buffer = require('../../../buffer@5.0.5.json!systemjs-json').Buffer;
var assert = require('assert');
assert.doesNotThrow(function() {
  Buffer.allocUnsafe(10);
});
assert.throws(function() {
  Buffer.from(10, 'hex');
});
assert.doesNotThrow(function() {
  Buffer.from('deadbeaf', 'hex');
});
