/* */ 
var countSteps = require('../math/countSteps');
function parseMs(ms) {
  return {
    milliseconds: countSteps(ms, 1, 1000),
    seconds: countSteps(ms, 1000, 60),
    minutes: countSteps(ms, 60000, 60),
    hours: countSteps(ms, 3600000, 24),
    days: countSteps(ms, 86400000)
  };
}
module.exports = parseMs;
