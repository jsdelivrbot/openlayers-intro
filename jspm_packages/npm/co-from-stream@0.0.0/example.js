/* */ 
var co = require('co');
var fs = require('fs');
var fromStream = require('../co-from-stream@0.0.0.json!systemjs-json');
co(function*() {
  var read = fromStream(fs.createReadStream('index.js'));
  var data;
  while (data = yield read())
    console.log(data.toString());
  console.log('all done!');
})();
