/* */ 
"format cjs";
define(function(require) {
  return {
    'contains': require('./queryString/contains'),
    'decode': require('./queryString/decode'),
    'encode': require('./queryString/encode'),
    'getParam': require('./queryString/getParam'),
    'getQuery': require('./queryString/getQuery'),
    'parse': require('./queryString/parse'),
    'setParam': require('./queryString/setParam')
  };
});
