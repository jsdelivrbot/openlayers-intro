/* */ 
"format cjs";
(function(process) {
  define(function() {
    function series() {
      var fns = arguments;
      return function() {
        var i = 0,
            n = fns.length;
        while (i < n) {
          fns[i].apply(this, arguments);
          i += 1;
        }
      };
    }
    return series;
  });
})(require('process'));
