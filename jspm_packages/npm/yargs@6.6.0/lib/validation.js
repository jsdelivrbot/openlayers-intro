/* */ 
const objFilter = require('./obj-filter');
module.exports = function(yargs, usage, y18n) {
  const __ = y18n.__;
  const __n = y18n.__n;
  const self = {};
  self.nonOptionCount = function(argv) {
    const demandedCommands = yargs.getDemandedCommands();
    const _s = argv._.length - yargs.getContext().commands.length;
    if (demandedCommands._ && (_s < demandedCommands._.min || _s > demandedCommands._.max)) {
      if (_s < demandedCommands._.min) {
        if (demandedCommands._.minMsg !== undefined) {
          usage.fail(demandedCommands._.minMsg ? demandedCommands._.minMsg.replace(/\$0/g, _s).replace(/\$1/, demandedCommands._.min) : null);
        } else {
          usage.fail(__('Not enough non-option arguments: got %s, need at least %s', _s, demandedCommands._.min));
        }
      } else if (_s > demandedCommands._.max) {
        if (demandedCommands._.maxMsg !== undefined) {
          usage.fail(demandedCommands._.maxMsg ? demandedCommands._.maxMsg.replace(/\$0/g, _s).replace(/\$1/, demandedCommands._.max) : null);
        } else {
          usage.fail(__('Too many non-option arguments: got %s, maximum of %s', _s, demandedCommands._.max));
        }
      }
    }
  };
  self.positionalCount = function(required, observed) {
    if (observed < required) {
      usage.fail(__('Not enough non-option arguments: got %s, need at least %s', observed, required));
    }
  };
  self.missingArgumentValue = function(argv) {
    const defaultValues = [true, false, ''];
    const options = yargs.getOptions();
    if (options.requiresArg.length > 0) {
      const missingRequiredArgs = [];
      options.requiresArg.forEach(function(key) {
        const value = argv[key];
        if (~defaultValues.indexOf(value) || (Array.isArray(value) && !value.length)) {
          missingRequiredArgs.push(key);
        }
      });
      if (missingRequiredArgs.length > 0) {
        usage.fail(__n('Missing argument value: %s', 'Missing argument values: %s', missingRequiredArgs.length, missingRequiredArgs.join(', ')));
      }
    }
  };
  self.requiredArguments = function(argv) {
    const demandedOptions = yargs.getDemandedOptions();
    var missing = null;
    Object.keys(demandedOptions).forEach(function(key) {
      if (!argv.hasOwnProperty(key)) {
        missing = missing || {};
        missing[key] = demandedOptions[key];
      }
    });
    if (missing) {
      const customMsgs = [];
      Object.keys(missing).forEach(function(key) {
        const msg = missing[key].msg;
        if (msg && customMsgs.indexOf(msg) < 0) {
          customMsgs.push(msg);
        }
      });
      const customMsg = customMsgs.length ? '\n' + customMsgs.join('\n') : '';
      usage.fail(__n('Missing required argument: %s', 'Missing required arguments: %s', Object.keys(missing).length, Object.keys(missing).join(', ') + customMsg));
    }
  };
  self.unknownArguments = function(argv, aliases) {
    const aliasLookup = {};
    const descriptions = usage.getDescriptions();
    const demandedOptions = yargs.getDemandedOptions();
    const commandKeys = yargs.getCommandInstance().getCommands();
    const unknown = [];
    const currentContext = yargs.getContext();
    Object.keys(aliases).forEach(function(key) {
      aliases[key].forEach(function(alias) {
        aliasLookup[alias] = key;
      });
    });
    Object.keys(argv).forEach(function(key) {
      if (key !== '$0' && key !== '_' && !descriptions.hasOwnProperty(key) && !demandedOptions.hasOwnProperty(key) && !aliasLookup.hasOwnProperty(key)) {
        unknown.push(key);
      }
    });
    if (commandKeys.length > 0) {
      argv._.slice(currentContext.commands.length).forEach(function(key) {
        if (commandKeys.indexOf(key) === -1) {
          unknown.push(key);
        }
      });
    }
    if (unknown.length > 0) {
      usage.fail(__n('Unknown argument: %s', 'Unknown arguments: %s', unknown.length, unknown.join(', ')));
    }
  };
  self.limitedChoices = function(argv) {
    const options = yargs.getOptions();
    const invalid = {};
    if (!Object.keys(options.choices).length)
      return;
    Object.keys(argv).forEach(function(key) {
      if (key !== '$0' && key !== '_' && options.choices.hasOwnProperty(key)) {
        [].concat(argv[key]).forEach(function(value) {
          if (options.choices[key].indexOf(value) === -1) {
            invalid[key] = (invalid[key] || []).concat(value);
          }
        });
      }
    });
    const invalidKeys = Object.keys(invalid);
    if (!invalidKeys.length)
      return;
    var msg = __('Invalid values:');
    invalidKeys.forEach(function(key) {
      msg += '\n  ' + __('Argument: %s, Given: %s, Choices: %s', key, usage.stringifiedValues(invalid[key]), usage.stringifiedValues(options.choices[key]));
    });
    usage.fail(msg);
  };
  var checks = [];
  self.check = function(f) {
    checks.push(f);
  };
  self.customChecks = function(argv, aliases) {
    for (var i = 0,
        f; (f = checks[i]) !== undefined; i++) {
      var result = null;
      try {
        result = f(argv, aliases);
      } catch (err) {
        usage.fail(err.message ? err.message : err, err);
        continue;
      }
      if (!result) {
        usage.fail(__('Argument check failed: %s', f.toString()));
      } else if (typeof result === 'string' || result instanceof Error) {
        usage.fail(result.toString(), result);
      }
    }
  };
  var implied = {};
  self.implies = function(key, value) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function(k) {
        self.implies(k, key[k]);
      });
    } else {
      implied[key] = value;
    }
  };
  self.getImplied = function() {
    return implied;
  };
  self.implications = function(argv) {
    const implyFail = [];
    Object.keys(implied).forEach(function(key) {
      var num;
      const origKey = key;
      var value = implied[key];
      num = Number(key);
      key = isNaN(num) ? key : num;
      if (typeof key === 'number') {
        key = argv._.length >= key;
      } else if (key.match(/^--no-.+/)) {
        key = key.match(/^--no-(.+)/)[1];
        key = !argv[key];
      } else {
        key = argv[key];
      }
      num = Number(value);
      value = isNaN(num) ? value : num;
      if (typeof value === 'number') {
        value = argv._.length >= value;
      } else if (value.match(/^--no-.+/)) {
        value = value.match(/^--no-(.+)/)[1];
        value = !argv[value];
      } else {
        value = argv[value];
      }
      if (key && !value) {
        implyFail.push(origKey);
      }
    });
    if (implyFail.length) {
      var msg = __('Implications failed:') + '\n';
      implyFail.forEach(function(key) {
        msg += ('  ' + key + ' -> ' + implied[key]);
      });
      usage.fail(msg);
    }
  };
  var conflicting = {};
  self.conflicts = function(key, value) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function(k) {
        self.conflicts(k, key[k]);
      });
    } else {
      conflicting[key] = value;
    }
  };
  self.getConflicting = function() {
    return conflicting;
  };
  self.conflicting = function(argv) {
    var args = Object.getOwnPropertyNames(argv);
    args.forEach(function(arg) {
      if (conflicting[arg] && args.indexOf(conflicting[arg]) !== -1) {
        usage.fail(__('Arguments %s and %s are mutually exclusive', arg, conflicting[arg]));
      }
    });
  };
  self.recommendCommands = function(cmd, potentialCommands) {
    const distance = require('./levenshtein');
    const threshold = 3;
    potentialCommands = potentialCommands.sort(function(a, b) {
      return b.length - a.length;
    });
    var recommended = null;
    var bestDistance = Infinity;
    for (var i = 0,
        candidate; (candidate = potentialCommands[i]) !== undefined; i++) {
      var d = distance(cmd, candidate);
      if (d <= threshold && d < bestDistance) {
        bestDistance = d;
        recommended = candidate;
      }
    }
    if (recommended)
      usage.fail(__('Did you mean %s?', recommended));
  };
  self.reset = function(globalLookup) {
    implied = objFilter(implied, function(k, v) {
      return globalLookup[k];
    });
    checks = [];
    conflicting = {};
    return self;
  };
  var frozen;
  self.freeze = function() {
    frozen = {};
    frozen.implied = implied;
    frozen.checks = checks;
    frozen.conflicting = conflicting;
  };
  self.unfreeze = function() {
    implied = frozen.implied;
    checks = frozen.checks;
    conflicting = frozen.conflicting;
    frozen = undefined;
  };
  return self;
};
