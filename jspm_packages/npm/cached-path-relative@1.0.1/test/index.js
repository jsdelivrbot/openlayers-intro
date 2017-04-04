/* */ 
var relative = require('../lib/index');
var path = require('path');
var test = require('tape');
test('should work', function(t) {
  t.equal(relative('test/index.js', '.'), path.relative('test/index.js', '.'));
  t.equal(relative('test/index.js', '.'), path.relative('test/index.js', '.'));
  t.end();
});
