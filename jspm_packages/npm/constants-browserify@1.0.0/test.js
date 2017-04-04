/* */ 
(function(process) {
  'use strict';
  var Assert = require('assert');
  var Constants = require('../constants-browserify@1.0.0.json!systemjs-json');
  try {
    var nodeConstants = require('constants');
    Assert.deepEqual(nodeConstants, Constants, 'The constants file was not equal');
  } catch (e) {
    console.error(e);
    console.error('\nTests failed!');
    process.exit(1);
  }
  console.info('Tests passed!');
})(require('process'));
