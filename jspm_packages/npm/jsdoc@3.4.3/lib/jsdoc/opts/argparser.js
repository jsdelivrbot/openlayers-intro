/* */ 
(function(process) {
  'use strict';
  var _ = require('underscore');
  var util = require('util');
  var hasOwnProp = Object.prototype.hasOwnProperty;
  var ArgParser = function() {
    this._options = [];
    this._shortNameIndex = {};
    this._longNameIndex = {};
  };
  ArgParser.prototype._getOptionByShortName = function(name) {
    if (hasOwnProp.call(this._shortNameIndex, name)) {
      return this._options[this._shortNameIndex[name]];
    }
    return null;
  };
  ArgParser.prototype._getOptionByLongName = function(name) {
    if (hasOwnProp.call(this._longNameIndex, name)) {
      return this._options[this._longNameIndex[name]];
    }
    return null;
  };
  ArgParser.prototype._addOption = function(option) {
    var currentIndex;
    var longName = option.longName;
    var shortName = option.shortName;
    this._options.push(option);
    currentIndex = this._options.length - 1;
    if (shortName) {
      this._shortNameIndex[shortName] = currentIndex;
    }
    if (longName) {
      this._longNameIndex[longName] = currentIndex;
    }
    return this;
  };
  ArgParser.prototype.addOption = function(shortName, longName, hasValue, helpText, canHaveMultiple, coercer) {
    var option = {
      shortName: shortName,
      longName: longName,
      hasValue: hasValue,
      helpText: helpText,
      canHaveMultiple: (canHaveMultiple || false),
      coercer: coercer
    };
    return this._addOption(option);
  };
  ArgParser.prototype.addIgnoredOption = function(shortName, longName) {
    var option = {
      shortName: shortName,
      longName: longName,
      ignore: true
    };
    return this._addOption(option);
  };
  function padding(length) {
    return new Array(length + 1).join(' ');
  }
  function padLeft(str, length) {
    return padding(length) + str;
  }
  function padRight(str, length) {
    return str + padding(length);
  }
  function findMaxLength(arr) {
    var max = 0;
    arr.forEach(function(item) {
      if (item.length > max) {
        max = item.length;
      }
    });
    return max;
  }
  function concatWithMaxLength(items, maxLength) {
    var result = '';
    result += items.shift();
    while (items.length && (result.length + items[0].length < maxLength)) {
      result += ' ' + items.shift();
    }
    return result;
  }
  function formatHelpInfo(options) {
    var MARGIN_LENGTH = 4;
    var results = [];
    var maxLength = process.stdout.columns;
    var maxNameLength = findMaxLength(options.names);
    var maxDescriptionLength = findMaxLength(options.descriptions);
    var wrapDescriptionAt = maxLength - (MARGIN_LENGTH * 3) - maxNameLength;
    options.names.forEach(function(name, i) {
      var result;
      var partialDescription;
      var words;
      result = padLeft(options.names[i], MARGIN_LENGTH);
      result = padRight(result, maxNameLength - options.names[i].length + MARGIN_LENGTH);
      words = options.descriptions[i].split(' ');
      result += concatWithMaxLength(words, wrapDescriptionAt);
      while (words.length) {
        partialDescription = padding(maxNameLength + (MARGIN_LENGTH * 2));
        partialDescription += concatWithMaxLength(words, wrapDescriptionAt);
        result += '\n' + partialDescription;
      }
      results.push(result);
    });
    return results;
  }
  ArgParser.prototype.help = function() {
    var options = {
      names: [],
      descriptions: []
    };
    this._options.forEach(function(option) {
      var name = '';
      if (option.ignore) {
        return;
      }
      if (option.shortName) {
        name += '-' + option.shortName + (option.longName ? ', ' : '');
      }
      if (option.longName) {
        name += '--' + option.longName;
      }
      if (option.hasValue) {
        name += ' <value>';
      }
      options.names.push(name);
      options.descriptions.push(option.helpText);
    });
    return 'Options:\n' + formatHelpInfo(options).join('\n');
  };
  ArgParser.prototype.parse = function(args, defaults) {
    var result = defaults && _.defaults({}, defaults) || {};
    result._ = [];
    for (var i = 0,
        leni = args.length; i < leni; i++) {
      var arg = '' + args[i],
          next = (i < leni - 1) ? '' + args[i + 1] : null,
          option,
          shortName = null,
          longName,
          name,
          value = null;
      if (arg.charAt(0) === '-') {
        if (arg.charAt(1) === '-') {
          name = longName = arg.slice(2);
          option = this._getOptionByLongName(longName);
        } else {
          name = shortName = arg.slice(1);
          option = this._getOptionByShortName(shortName);
        }
        if (option === null) {
          throw new Error(util.format('Unknown command-line option "%s".', name));
        }
        if (option.hasValue) {
          value = next;
          i++;
          if (value === null || value.charAt(0) === '-') {
            throw new Error(util.format('The command-line option "%s" requires a value.', name));
          }
        } else {
          value = true;
        }
        if (option.ignore) {
          continue;
        }
        if (option.longName && shortName) {
          name = option.longName;
        }
        if (typeof option.coercer === 'function') {
          value = option.coercer(value);
        }
        if (option.canHaveMultiple && hasOwnProp.call(result, name)) {
          var val = result[name];
          if (val instanceof Array) {
            val.push(value);
          } else {
            result[name] = [val, value];
          }
        } else {
          result[name] = value;
        }
      } else {
        result._.push(arg);
      }
    }
    return result;
  };
  module.exports = ArgParser;
})(require('process'));
