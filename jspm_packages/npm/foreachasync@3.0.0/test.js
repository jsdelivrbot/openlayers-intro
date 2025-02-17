/* */ 
(function() {
  "use strict";
  var forEachAsync = require('./forEachAsync').forEachAsync;
  ;
  forEachAsync([0, 500, 70, 200, 400, 100], function(next, element, i, arr) {
    console.log(element, 'is element', i, 'of', arr.length);
    this[element] = i;
    if (i > 2) {
      next();
    } else {
      setTimeout(next, element);
    }
  }, {}).then(function() {
    console.log(this);
  }).then(function() {
    console.log("now wasn't that nice?");
  });
}());
