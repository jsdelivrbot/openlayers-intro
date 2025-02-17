/* */ 
(function(Buffer, process) {
  (function() {
    var CoffeeScript,
        addHistory,
        addMultilineHandler,
        fs,
        getCommandId,
        merge,
        nodeREPL,
        path,
        ref,
        replDefaults,
        runInContext,
        updateSyntaxError,
        vm;
    fs = require('fs');
    path = require('path');
    vm = require('vm');
    nodeREPL = require('repl');
    CoffeeScript = require('./coffee-script');
    ref = require('./helpers'), merge = ref.merge, updateSyntaxError = ref.updateSyntaxError;
    replDefaults = {
      prompt: 'coffee> ',
      historyFile: process.env.HOME ? path.join(process.env.HOME, '.coffee_history') : void 0,
      historyMaxInputSize: 10240,
      "eval": function(input, context, filename, cb) {
        var Assign,
            Block,
            Literal,
            Value,
            ast,
            err,
            js,
            ref1,
            referencedVars,
            token,
            tokens;
        input = input.replace(/\uFF00/g, '\n');
        input = input.replace(/^\(([\s\S]*)\n\)$/m, '$1');
        input = input.replace(/^\s*try\s*{([\s\S]*)}\s*catch.*$/m, '$1');
        ref1 = require('./nodes'), Block = ref1.Block, Assign = ref1.Assign, Value = ref1.Value, Literal = ref1.Literal;
        try {
          tokens = CoffeeScript.tokens(input);
          referencedVars = (function() {
            var i,
                len,
                results;
            results = [];
            for (i = 0, len = tokens.length; i < len; i++) {
              token = tokens[i];
              if (token[0] === 'IDENTIFIER') {
                results.push(token[1]);
              }
            }
            return results;
          })();
          ast = CoffeeScript.nodes(tokens);
          ast = new Block([new Assign(new Value(new Literal('_')), ast, '=')]);
          js = ast.compile({
            bare: true,
            locals: Object.keys(context),
            referencedVars: referencedVars
          });
          return cb(null, runInContext(js, context, filename));
        } catch (error) {
          err = error;
          updateSyntaxError(err, input);
          return cb(err);
        }
      }
    };
    runInContext = function(js, context, filename) {
      if (context === global) {
        return vm.runInThisContext(js, filename);
      } else {
        return vm.runInContext(js, context, filename);
      }
    };
    addMultilineHandler = function(repl) {
      var inputStream,
          multiline,
          nodeLineListener,
          origPrompt,
          outputStream,
          ref1,
          rli;
      rli = repl.rli, inputStream = repl.inputStream, outputStream = repl.outputStream;
      origPrompt = (ref1 = repl._prompt) != null ? ref1 : repl.prompt;
      multiline = {
        enabled: false,
        initialPrompt: origPrompt.replace(/^[^> ]*/, function(x) {
          return x.replace(/./g, '-');
        }),
        prompt: origPrompt.replace(/^[^> ]*>?/, function(x) {
          return x.replace(/./g, '.');
        }),
        buffer: ''
      };
      nodeLineListener = rli.listeners('line')[0];
      rli.removeListener('line', nodeLineListener);
      rli.on('line', function(cmd) {
        if (multiline.enabled) {
          multiline.buffer += cmd + "\n";
          rli.setPrompt(multiline.prompt);
          rli.prompt(true);
        } else {
          rli.setPrompt(origPrompt);
          nodeLineListener(cmd);
        }
      });
      return inputStream.on('keypress', function(char, key) {
        if (!(key && key.ctrl && !key.meta && !key.shift && key.name === 'v')) {
          return;
        }
        if (multiline.enabled) {
          if (!multiline.buffer.match(/\n/)) {
            multiline.enabled = !multiline.enabled;
            rli.setPrompt(origPrompt);
            rli.prompt(true);
            return;
          }
          if ((rli.line != null) && !rli.line.match(/^\s*$/)) {
            return;
          }
          multiline.enabled = !multiline.enabled;
          rli.line = '';
          rli.cursor = 0;
          rli.output.cursorTo(0);
          rli.output.clearLine(1);
          multiline.buffer = multiline.buffer.replace(/\n/g, '\uFF00');
          rli.emit('line', multiline.buffer);
          multiline.buffer = '';
        } else {
          multiline.enabled = !multiline.enabled;
          rli.setPrompt(multiline.initialPrompt);
          rli.prompt(true);
        }
      });
    };
    addHistory = function(repl, filename, maxSize) {
      var buffer,
          fd,
          lastLine,
          readFd,
          size,
          stat;
      lastLine = null;
      try {
        stat = fs.statSync(filename);
        size = Math.min(maxSize, stat.size);
        readFd = fs.openSync(filename, 'r');
        buffer = new Buffer(size);
        fs.readSync(readFd, buffer, 0, size, stat.size - size);
        fs.closeSync(readFd);
        repl.rli.history = buffer.toString().split('\n').reverse();
        if (stat.size > maxSize) {
          repl.rli.history.pop();
        }
        if (repl.rli.history[0] === '') {
          repl.rli.history.shift();
        }
        repl.rli.historyIndex = -1;
        lastLine = repl.rli.history[0];
      } catch (error) {}
      fd = fs.openSync(filename, 'a');
      repl.rli.addListener('line', function(code) {
        if (code && code.length && code !== '.history' && code !== '.exit' && lastLine !== code) {
          fs.writeSync(fd, code + "\n");
          return lastLine = code;
        }
      });
      repl.on('exit', function() {
        return fs.closeSync(fd);
      });
      return repl.commands[getCommandId(repl, 'history')] = {
        help: 'Show command history',
        action: function() {
          repl.outputStream.write((repl.rli.history.slice(0).reverse().join('\n')) + "\n");
          return repl.displayPrompt();
        }
      };
    };
    getCommandId = function(repl, commandName) {
      var commandsHaveLeadingDot;
      commandsHaveLeadingDot = repl.commands['.help'] != null;
      if (commandsHaveLeadingDot) {
        return "." + commandName;
      } else {
        return commandName;
      }
    };
    module.exports = {start: function(opts) {
        var build,
            major,
            minor,
            ref1,
            repl;
        if (opts == null) {
          opts = {};
        }
        ref1 = process.versions.node.split('.').map(function(n) {
          return parseInt(n);
        }), major = ref1[0], minor = ref1[1], build = ref1[2];
        if (major === 0 && minor < 8) {
          console.warn("Node 0.8.0+ required for CoffeeScript REPL");
          process.exit(1);
        }
        CoffeeScript.register();
        process.argv = ['coffee'].concat(process.argv.slice(2));
        opts = merge(replDefaults, opts);
        repl = nodeREPL.start(opts);
        if (opts.prelude) {
          runInContext(opts.prelude, repl.context, 'prelude');
        }
        repl.on('exit', function() {
          if (!repl.rli.closed) {
            return repl.outputStream.write('\n');
          }
        });
        addMultilineHandler(repl);
        if (opts.historyFile) {
          addHistory(repl, opts.historyFile, opts.historyMaxInputSize);
        }
        repl.commands[getCommandId(repl, 'load')].help = 'Load code from a file into this REPL session';
        return repl;
      }};
  }).call(this);
})(require('buffer').Buffer, require('process'));
