/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = function(tasks, concurrency, callback) {
    if (typeof concurrency === 'function') {
      callback = concurrency;
      concurrency = null;
    }
    callback = (0, _once2.default)(callback || _noop2.default);
    var keys = (0, _keys2.default)(tasks);
    var numTasks = keys.length;
    if (!numTasks) {
      return callback(null);
    }
    if (!concurrency) {
      concurrency = numTasks;
    }
    var results = {};
    var runningTasks = 0;
    var hasError = false;
    var listeners = {};
    var readyTasks = [];
    var readyToCheck = [];
    var uncheckedDependencies = {};
    (0, _baseForOwn2.default)(tasks, function(task, key) {
      if (!(0, _isArray2.default)(task)) {
        enqueueTask(key, [task]);
        readyToCheck.push(key);
        return;
      }
      var dependencies = task.slice(0, task.length - 1);
      var remainingDependencies = dependencies.length;
      if (remainingDependencies === 0) {
        enqueueTask(key, task);
        readyToCheck.push(key);
        return;
      }
      uncheckedDependencies[key] = remainingDependencies;
      (0, _arrayEach2.default)(dependencies, function(dependencyName) {
        if (!tasks[dependencyName]) {
          throw new Error('async.auto task `' + key + '` has a non-existent dependency in ' + dependencies.join(', '));
        }
        addListener(dependencyName, function() {
          remainingDependencies--;
          if (remainingDependencies === 0) {
            enqueueTask(key, task);
          }
        });
      });
    });
    checkForDeadlocks();
    processQueue();
    function enqueueTask(key, task) {
      readyTasks.push(function() {
        runTask(key, task);
      });
    }
    function processQueue() {
      if (readyTasks.length === 0 && runningTasks === 0) {
        return callback(null, results);
      }
      while (readyTasks.length && runningTasks < concurrency) {
        var run = readyTasks.shift();
        run();
      }
    }
    function addListener(taskName, fn) {
      var taskListeners = listeners[taskName];
      if (!taskListeners) {
        taskListeners = listeners[taskName] = [];
      }
      taskListeners.push(fn);
    }
    function taskComplete(taskName) {
      var taskListeners = listeners[taskName] || [];
      (0, _arrayEach2.default)(taskListeners, function(fn) {
        fn();
      });
      processQueue();
    }
    function runTask(key, task) {
      if (hasError)
        return;
      var taskCallback = (0, _onlyOnce2.default)((0, _rest2.default)(function(err, args) {
        runningTasks--;
        if (args.length <= 1) {
          args = args[0];
        }
        if (err) {
          var safeResults = {};
          (0, _baseForOwn2.default)(results, function(val, rkey) {
            safeResults[rkey] = val;
          });
          safeResults[key] = args;
          hasError = true;
          listeners = [];
          callback(err, safeResults);
        } else {
          results[key] = args;
          taskComplete(key);
        }
      }));
      runningTasks++;
      var taskFn = task[task.length - 1];
      if (task.length > 1) {
        taskFn(results, taskCallback);
      } else {
        taskFn(taskCallback);
      }
    }
    function checkForDeadlocks() {
      var currentTask;
      var counter = 0;
      while (readyToCheck.length) {
        currentTask = readyToCheck.pop();
        counter++;
        (0, _arrayEach2.default)(getDependents(currentTask), function(dependent) {
          if (--uncheckedDependencies[dependent] === 0) {
            readyToCheck.push(dependent);
          }
        });
      }
      if (counter !== numTasks) {
        throw new Error('async.auto cannot execute tasks due to a recursive dependency');
      }
    }
    function getDependents(taskName) {
      var result = [];
      (0, _baseForOwn2.default)(tasks, function(task, key) {
        if ((0, _isArray2.default)(task) && (0, _baseIndexOf2.default)(task, taskName, 0) >= 0) {
          result.push(key);
        }
      });
      return result;
    }
  };
  var _arrayEach = require('lodash/_arrayEach');
  var _arrayEach2 = _interopRequireDefault(_arrayEach);
  var _baseForOwn = require('lodash/_baseForOwn');
  var _baseForOwn2 = _interopRequireDefault(_baseForOwn);
  var _baseIndexOf = require('lodash/_baseIndexOf');
  var _baseIndexOf2 = _interopRequireDefault(_baseIndexOf);
  var _isArray = require('lodash/isArray');
  var _isArray2 = _interopRequireDefault(_isArray);
  var _keys = require('lodash/keys');
  var _keys2 = _interopRequireDefault(_keys);
  var _noop = require('lodash/noop');
  var _noop2 = _interopRequireDefault(_noop);
  var _rest = require('./internal/rest');
  var _rest2 = _interopRequireDefault(_rest);
  var _once = require('./internal/once');
  var _once2 = _interopRequireDefault(_once);
  var _onlyOnce = require('./internal/onlyOnce');
  var _onlyOnce2 = _interopRequireDefault(_onlyOnce);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  module.exports = exports['default'];
})(require('process'));
