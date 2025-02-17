/* */ 
"format cjs";
define(function(require) {
  return {
    'ceil': require('./math/ceil'),
    'clamp': require('./math/clamp'),
    'countSteps': require('./math/countSteps'),
    'floor': require('./math/floor'),
    'inRange': require('./math/inRange'),
    'isNear': require('./math/isNear'),
    'lerp': require('./math/lerp'),
    'loop': require('./math/loop'),
    'map': require('./math/map'),
    'norm': require('./math/norm'),
    'round': require('./math/round')
  };
});
