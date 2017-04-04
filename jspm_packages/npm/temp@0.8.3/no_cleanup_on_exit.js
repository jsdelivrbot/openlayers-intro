/* */ 
(function(process) {
  var temp = require('../temp@0.8.3.json!systemjs-json').track();
  describe('temp will create dir that will remain after the process exits', function() {
    it('creates a dir', function() {
      var p = temp.mkdirSync("shouldBeDeletedOnExit");
      console.log('created dir ' + p);
    });
  });
})(require('process'));
