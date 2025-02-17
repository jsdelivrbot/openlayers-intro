/* */ 
(function(process) {
  var mkpath = require('../mkpath');
  var path = require('path');
  var fs = require('fs');
  var test = require('tap').test;
  test('rel', function(t) {
    t.plan(2);
    var x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    var y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    var z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    var cwd = process.cwd();
    process.chdir('/tmp');
    var file = [x, y, z].join('/');
    mkpath(file, 0755, function(err) {
      if (err)
        t.fail(err);
      else
        path.exists(file, function(ex) {
          if (!ex)
            t.fail('file not created');
          else
            fs.stat(file, function(err, stat) {
              if (err)
                t.fail(err);
              else {
                process.chdir(cwd);
                t.equal(stat.mode & 0777, 0755);
                t.ok(stat.isDirectory(), 'target not a directory');
                t.end();
              }
            });
        });
    });
  });
})(require('process'));
