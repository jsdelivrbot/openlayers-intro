/* */ 
var mkpath = require('../mkpath');
var path = require('path');
var fs = require('fs');
var test = require('tap').test;
var ps = ['', 'tmp'];
for (var i = 0; i < 25; i++) {
  var dir = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
  ps.push(dir);
}
var file = ps.join('/');
var itw = ps.slice(0, 3).join('/');
test('clobber-pre', function(t) {
  console.error("about to write to " + itw);
  fs.writeFileSync(itw, 'I AM IN THE WAY, THE TRUTH, AND THE LIGHT.');
  fs.stat(itw, function(er, stat) {
    t.ifError(er);
    t.ok(stat && stat.isFile(), 'should be file');
    t.end();
  });
});
test('clobber', function(t) {
  t.plan(2);
  mkpath(file, 0755, function(err) {
    t.ok(err);
    t.equal(err.code, 'ENOTDIR');
    t.end();
  });
});
