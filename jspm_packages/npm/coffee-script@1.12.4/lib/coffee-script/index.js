/* */ 
(function() {
  var key,
      ref,
      val;
  ref = require('./coffee-script');
  for (key in ref) {
    val = ref[key];
    exports[key] = val;
  }
}).call(this);
