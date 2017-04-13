/* */ 
(function(process) {
  var temp = require('./lib/temp').track();
  describe('temp will create dir that will remain after the process exits', function() {
    it('creates a dir', function() {
      var p = temp.mkdirSync("shouldBeDeletedOnExit");
      console.log('created dir ' + p);
    });
  });
})(require('process'));
