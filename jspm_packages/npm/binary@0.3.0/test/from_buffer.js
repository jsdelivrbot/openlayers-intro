/* */ 
(function(Buffer) {
  var binary = require('../index');
  var test = require('tap').test;
  test('from buffer', function(t) {
    t.plan(1);
    binary(new Buffer([97, 98, 99])).word8('a').word16be('bc').tap(function(vars) {
      t.same(vars, {
        a: 97,
        bc: 25187
      });
    });
    ;
  });
})(require('buffer').Buffer);
