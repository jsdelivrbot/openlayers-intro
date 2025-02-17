/* */ 
(function() {
  var LONG_FLAG,
      MULTI_FLAG,
      OPTIONAL,
      OptionParser,
      SHORT_FLAG,
      buildRule,
      buildRules,
      normalizeArguments,
      repeat;
  repeat = require('./helpers').repeat;
  exports.OptionParser = OptionParser = (function() {
    function OptionParser(rules, banner) {
      this.banner = banner;
      this.rules = buildRules(rules);
    }
    OptionParser.prototype.parse = function(args) {
      var arg,
          i,
          isOption,
          j,
          k,
          len,
          len1,
          matchedRule,
          options,
          originalArgs,
          pos,
          ref,
          rule,
          seenNonOptionArg,
          skippingArgument,
          value;
      options = {"arguments": []};
      skippingArgument = false;
      originalArgs = args;
      args = normalizeArguments(args);
      for (i = j = 0, len = args.length; j < len; i = ++j) {
        arg = args[i];
        if (skippingArgument) {
          skippingArgument = false;
          continue;
        }
        if (arg === '--') {
          pos = originalArgs.indexOf('--');
          options["arguments"] = options["arguments"].concat(originalArgs.slice(pos + 1));
          break;
        }
        isOption = !!(arg.match(LONG_FLAG) || arg.match(SHORT_FLAG));
        seenNonOptionArg = options["arguments"].length > 0;
        if (!seenNonOptionArg) {
          matchedRule = false;
          ref = this.rules;
          for (k = 0, len1 = ref.length; k < len1; k++) {
            rule = ref[k];
            if (rule.shortFlag === arg || rule.longFlag === arg) {
              value = true;
              if (rule.hasArgument) {
                skippingArgument = true;
                value = args[i + 1];
              }
              options[rule.name] = rule.isList ? (options[rule.name] || []).concat(value) : value;
              matchedRule = true;
              break;
            }
          }
          if (isOption && !matchedRule) {
            throw new Error("unrecognized option: " + arg);
          }
        }
        if (seenNonOptionArg || !isOption) {
          options["arguments"].push(arg);
        }
      }
      return options;
    };
    OptionParser.prototype.help = function() {
      var j,
          len,
          letPart,
          lines,
          ref,
          rule,
          spaces;
      lines = [];
      if (this.banner) {
        lines.unshift(this.banner + "\n");
      }
      ref = this.rules;
      for (j = 0, len = ref.length; j < len; j++) {
        rule = ref[j];
        spaces = 15 - rule.longFlag.length;
        spaces = spaces > 0 ? repeat(' ', spaces) : '';
        letPart = rule.shortFlag ? rule.shortFlag + ', ' : '    ';
        lines.push('  ' + letPart + rule.longFlag + spaces + rule.description);
      }
      return "\n" + (lines.join('\n')) + "\n";
    };
    return OptionParser;
  })();
  LONG_FLAG = /^(--\w[\w\-]*)/;
  SHORT_FLAG = /^(-\w)$/;
  MULTI_FLAG = /^-(\w{2,})/;
  OPTIONAL = /\[(\w+(\*?))\]/;
  buildRules = function(rules) {
    var j,
        len,
        results,
        tuple;
    results = [];
    for (j = 0, len = rules.length; j < len; j++) {
      tuple = rules[j];
      if (tuple.length < 3) {
        tuple.unshift(null);
      }
      results.push(buildRule.apply(null, tuple));
    }
    return results;
  };
  buildRule = function(shortFlag, longFlag, description, options) {
    var match;
    if (options == null) {
      options = {};
    }
    match = longFlag.match(OPTIONAL);
    longFlag = longFlag.match(LONG_FLAG)[1];
    return {
      name: longFlag.substr(2),
      shortFlag: shortFlag,
      longFlag: longFlag,
      description: description,
      hasArgument: !!(match && match[1]),
      isList: !!(match && match[2])
    };
  };
  normalizeArguments = function(args) {
    var arg,
        j,
        k,
        l,
        len,
        len1,
        match,
        ref,
        result;
    args = args.slice(0);
    result = [];
    for (j = 0, len = args.length; j < len; j++) {
      arg = args[j];
      if (match = arg.match(MULTI_FLAG)) {
        ref = match[1].split('');
        for (k = 0, len1 = ref.length; k < len1; k++) {
          l = ref[k];
          result.push('-' + l);
        }
      } else {
        result.push(arg);
      }
    }
    return result;
  };
}).call(this);
