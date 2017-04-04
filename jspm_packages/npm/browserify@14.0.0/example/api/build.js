/* */ 
(function(process) {
  var browserify = require('../../../browserify@14.0.0.json!systemjs-json');
  var b = browserify();
  b.add('./browser/main.js');
  b.bundle().pipe(process.stdout);
})(require('process'));
