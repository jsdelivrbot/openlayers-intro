/* */ 
(function(Buffer) {
  var buf = new Buffer([97, 98, 99, 100, 101, 102, 0]);
  var binary = require('../index');
  binary(buf).word16ls('ab').word32bu('cf').word8('x').tap(function(vars) {
    console.dir(vars);
  });
  ;
})(require('buffer').Buffer);
