/* */ 
resolve = require('../../../../resolve@1.1.7.json!systemjs-json');
module.exports = function(t, cb) {
  resolve('mymodule', null, cb);
};
