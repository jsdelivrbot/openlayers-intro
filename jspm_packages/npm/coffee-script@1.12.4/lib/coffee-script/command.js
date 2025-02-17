/* */ 
(function(Buffer, process) {
  (function() {
    var BANNER,
        CoffeeScript,
        EventEmitter,
        SWITCHES,
        compileJoin,
        compileOptions,
        compilePath,
        compileScript,
        compileStdio,
        exec,
        findDirectoryIndex,
        forkNode,
        fs,
        helpers,
        hidden,
        joinTimeout,
        makePrelude,
        mkdirp,
        notSources,
        optionParser,
        optparse,
        opts,
        outputPath,
        parseOptions,
        path,
        printLine,
        printTokens,
        printWarn,
        ref,
        removeSource,
        removeSourceDir,
        silentUnlink,
        sourceCode,
        sources,
        spawn,
        timeLog,
        usage,
        useWinPathSep,
        version,
        wait,
        watch,
        watchDir,
        watchedDirs,
        writeJs,
        indexOf = [].indexOf || function(item) {
          for (var i = 0,
              l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
              return i;
          }
          return -1;
        };
    fs = require('fs');
    path = require('path');
    helpers = require('./helpers');
    optparse = require('./optparse');
    CoffeeScript = require('./coffee-script');
    ref = require('@empty'), spawn = ref.spawn, exec = ref.exec;
    EventEmitter = require('events').EventEmitter;
    useWinPathSep = path.sep === '\\';
    helpers.extend(CoffeeScript, new EventEmitter);
    printLine = function(line) {
      return process.stdout.write(line + '\n');
    };
    printWarn = function(line) {
      return process.stderr.write(line + '\n');
    };
    hidden = function(file) {
      return /^\.|~$/.test(file);
    };
    BANNER = 'Usage: coffee [options] path/to/script.coffee -- [args]\n\nIf called without options, `coffee` will run your script.';
    SWITCHES = [['-b', '--bare', 'compile without a top-level function wrapper'], ['-c', '--compile', 'compile to JavaScript and save as .js files'], ['-e', '--eval', 'pass a string from the command line as input'], ['-h', '--help', 'display this help message'], ['-i', '--interactive', 'run an interactive CoffeeScript REPL'], ['-j', '--join [FILE]', 'concatenate the source CoffeeScript before compiling'], ['-m', '--map', 'generate source map and save as .js.map files'], ['-M', '--inline-map', 'generate source map and include it directly in output'], ['-n', '--nodes', 'print out the parse tree that the parser produces'], ['--nodejs [ARGS]', 'pass options directly to the "node" binary'], ['--no-header', 'suppress the "Generated by" header'], ['-o', '--output [DIR]', 'set the output directory for compiled JavaScript'], ['-p', '--print', 'print out the compiled JavaScript'], ['-r', '--require [MODULE*]', 'require the given module before eval or REPL'], ['-s', '--stdio', 'listen for and compile scripts over stdio'], ['-l', '--literate', 'treat stdio as literate style coffee-script'], ['-t', '--tokens', 'print out the tokens that the lexer/rewriter produce'], ['-v', '--version', 'display the version number'], ['-w', '--watch', 'watch scripts for changes and rerun commands']];
    opts = {};
    sources = [];
    sourceCode = [];
    notSources = {};
    watchedDirs = {};
    optionParser = null;
    exports.run = function() {
      var i,
          len,
          literals,
          ref1,
          replCliOpts,
          results,
          source;
      parseOptions();
      replCliOpts = {useGlobal: true};
      if (opts.require) {
        opts.prelude = makePrelude(opts.require);
      }
      replCliOpts.prelude = opts.prelude;
      if (opts.nodejs) {
        return forkNode();
      }
      if (opts.help) {
        return usage();
      }
      if (opts.version) {
        return version();
      }
      if (opts.interactive) {
        return require('./repl').start(replCliOpts);
      }
      if (opts.stdio) {
        return compileStdio();
      }
      if (opts["eval"]) {
        return compileScript(null, opts["arguments"][0]);
      }
      if (!opts["arguments"].length) {
        return require('./repl').start(replCliOpts);
      }
      literals = opts.run ? opts["arguments"].splice(1) : [];
      process.argv = process.argv.slice(0, 2).concat(literals);
      process.argv[0] = 'coffee';
      if (opts.output) {
        opts.output = path.resolve(opts.output);
      }
      if (opts.join) {
        opts.join = path.resolve(opts.join);
        console.error('\nThe --join option is deprecated and will be removed in a future version.\n\nIf for some reason it\'s necessary to share local variables between files,\nreplace...\n\n    $ coffee --compile --join bundle.js -- a.coffee b.coffee c.coffee\n\nwith...\n\n    $ cat a.coffee b.coffee c.coffee | coffee --compile --stdio > bundle.js\n');
      }
      ref1 = opts["arguments"];
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        source = ref1[i];
        source = path.resolve(source);
        results.push(compilePath(source, true, source));
      }
      return results;
    };
    makePrelude = function(requires) {
      return requires.map(function(module) {
        var _,
            match,
            name;
        if (match = module.match(/^(.*)=(.*)$/)) {
          _ = match[0], name = match[1], module = match[2];
        }
        name || (name = helpers.baseFileName(module, true, useWinPathSep));
        return name + " = require('" + module + "')";
      }).join(';');
    };
    compilePath = function(source, topLevel, base) {
      var code,
          err,
          file,
          files,
          i,
          len,
          results,
          stats;
      if (indexOf.call(sources, source) >= 0 || watchedDirs[source] || !topLevel && (notSources[source] || hidden(source))) {
        return;
      }
      try {
        stats = fs.statSync(source);
      } catch (error) {
        err = error;
        if (err.code === 'ENOENT') {
          console.error("File not found: " + source);
          process.exit(1);
        }
        throw err;
      }
      if (stats.isDirectory()) {
        if (path.basename(source) === 'node_modules') {
          notSources[source] = true;
          return;
        }
        if (opts.run) {
          compilePath(findDirectoryIndex(source), topLevel, base);
          return;
        }
        if (opts.watch) {
          watchDir(source, base);
        }
        try {
          files = fs.readdirSync(source);
        } catch (error) {
          err = error;
          if (err.code === 'ENOENT') {
            return;
          } else {
            throw err;
          }
        }
        results = [];
        for (i = 0, len = files.length; i < len; i++) {
          file = files[i];
          results.push(compilePath(path.join(source, file), false, base));
        }
        return results;
      } else if (topLevel || helpers.isCoffee(source)) {
        sources.push(source);
        sourceCode.push(null);
        delete notSources[source];
        if (opts.watch) {
          watch(source, base);
        }
        try {
          code = fs.readFileSync(source);
        } catch (error) {
          err = error;
          if (err.code === 'ENOENT') {
            return;
          } else {
            throw err;
          }
        }
        return compileScript(source, code.toString(), base);
      } else {
        return notSources[source] = true;
      }
    };
    findDirectoryIndex = function(source) {
      var err,
          ext,
          i,
          index,
          len,
          ref1;
      ref1 = CoffeeScript.FILE_EXTENSIONS;
      for (i = 0, len = ref1.length; i < len; i++) {
        ext = ref1[i];
        index = path.join(source, "index" + ext);
        try {
          if ((fs.statSync(index)).isFile()) {
            return index;
          }
        } catch (error) {
          err = error;
          if (err.code !== 'ENOENT') {
            throw err;
          }
        }
      }
      console.error("Missing index.coffee or index.litcoffee in " + source);
      return process.exit(1);
    };
    compileScript = function(file, input, base) {
      var compiled,
          err,
          message,
          o,
          options,
          t,
          task;
      if (base == null) {
        base = null;
      }
      o = opts;
      options = compileOptions(file, base);
      try {
        t = task = {
          file: file,
          input: input,
          options: options
        };
        CoffeeScript.emit('compile', task);
        if (o.tokens) {
          return printTokens(CoffeeScript.tokens(t.input, t.options));
        } else if (o.nodes) {
          return printLine(CoffeeScript.nodes(t.input, t.options).toString().trim());
        } else if (o.run) {
          CoffeeScript.register();
          if (opts.prelude) {
            CoffeeScript["eval"](opts.prelude, t.options);
          }
          return CoffeeScript.run(t.input, t.options);
        } else if (o.join && t.file !== o.join) {
          if (helpers.isLiterate(file)) {
            t.input = helpers.invertLiterate(t.input);
          }
          sourceCode[sources.indexOf(t.file)] = t.input;
          return compileJoin();
        } else {
          compiled = CoffeeScript.compile(t.input, t.options);
          t.output = compiled;
          if (o.map) {
            t.output = compiled.js;
            t.sourceMap = compiled.v3SourceMap;
          }
          CoffeeScript.emit('success', task);
          if (o.print) {
            return printLine(t.output.trim());
          } else if (o.compile || o.map) {
            return writeJs(base, t.file, t.output, options.jsPath, t.sourceMap);
          }
        }
      } catch (error) {
        err = error;
        CoffeeScript.emit('failure', err, task);
        if (CoffeeScript.listeners('failure').length) {
          return;
        }
        message = (err != null ? err.stack : void 0) || ("" + err);
        if (o.watch) {
          return printLine(message + '\x07');
        } else {
          printWarn(message);
          return process.exit(1);
        }
      }
    };
    compileStdio = function() {
      var buffers,
          stdin;
      buffers = [];
      stdin = process.openStdin();
      stdin.on('data', function(buffer) {
        if (buffer) {
          return buffers.push(buffer);
        }
      });
      return stdin.on('end', function() {
        return compileScript(null, Buffer.concat(buffers).toString());
      });
    };
    joinTimeout = null;
    compileJoin = function() {
      if (!opts.join) {
        return;
      }
      if (!sourceCode.some(function(code) {
        return code === null;
      })) {
        clearTimeout(joinTimeout);
        return joinTimeout = wait(100, function() {
          return compileScript(opts.join, sourceCode.join('\n'), opts.join);
        });
      }
    };
    watch = function(source, base) {
      var compile,
          compileTimeout,
          err,
          prevStats,
          rewatch,
          startWatcher,
          watchErr,
          watcher;
      watcher = null;
      prevStats = null;
      compileTimeout = null;
      watchErr = function(err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
        if (indexOf.call(sources, source) < 0) {
          return;
        }
        try {
          rewatch();
          return compile();
        } catch (error) {
          removeSource(source, base);
          return compileJoin();
        }
      };
      compile = function() {
        clearTimeout(compileTimeout);
        return compileTimeout = wait(25, function() {
          return fs.stat(source, function(err, stats) {
            if (err) {
              return watchErr(err);
            }
            if (prevStats && stats.size === prevStats.size && stats.mtime.getTime() === prevStats.mtime.getTime()) {
              return rewatch();
            }
            prevStats = stats;
            return fs.readFile(source, function(err, code) {
              if (err) {
                return watchErr(err);
              }
              compileScript(source, code.toString(), base);
              return rewatch();
            });
          });
        });
      };
      startWatcher = function() {
        return watcher = fs.watch(source).on('change', compile).on('error', function(err) {
          if (err.code !== 'EPERM') {
            throw err;
          }
          return removeSource(source, base);
        });
      };
      rewatch = function() {
        if (watcher != null) {
          watcher.close();
        }
        return startWatcher();
      };
      try {
        return startWatcher();
      } catch (error) {
        err = error;
        return watchErr(err);
      }
    };
    watchDir = function(source, base) {
      var err,
          readdirTimeout,
          startWatcher,
          stopWatcher,
          watcher;
      watcher = null;
      readdirTimeout = null;
      startWatcher = function() {
        return watcher = fs.watch(source).on('error', function(err) {
          if (err.code !== 'EPERM') {
            throw err;
          }
          return stopWatcher();
        }).on('change', function() {
          clearTimeout(readdirTimeout);
          return readdirTimeout = wait(25, function() {
            var err,
                file,
                files,
                i,
                len,
                results;
            try {
              files = fs.readdirSync(source);
            } catch (error) {
              err = error;
              if (err.code !== 'ENOENT') {
                throw err;
              }
              return stopWatcher();
            }
            results = [];
            for (i = 0, len = files.length; i < len; i++) {
              file = files[i];
              results.push(compilePath(path.join(source, file), false, base));
            }
            return results;
          });
        });
      };
      stopWatcher = function() {
        watcher.close();
        return removeSourceDir(source, base);
      };
      watchedDirs[source] = true;
      try {
        return startWatcher();
      } catch (error) {
        err = error;
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }
    };
    removeSourceDir = function(source, base) {
      var file,
          i,
          len,
          sourcesChanged;
      delete watchedDirs[source];
      sourcesChanged = false;
      for (i = 0, len = sources.length; i < len; i++) {
        file = sources[i];
        if (!(source === path.dirname(file))) {
          continue;
        }
        removeSource(file, base);
        sourcesChanged = true;
      }
      if (sourcesChanged) {
        return compileJoin();
      }
    };
    removeSource = function(source, base) {
      var index;
      index = sources.indexOf(source);
      sources.splice(index, 1);
      sourceCode.splice(index, 1);
      if (!opts.join) {
        silentUnlink(outputPath(source, base));
        silentUnlink(outputPath(source, base, '.js.map'));
        return timeLog("removed " + source);
      }
    };
    silentUnlink = function(path) {
      var err,
          ref1;
      try {
        return fs.unlinkSync(path);
      } catch (error) {
        err = error;
        if ((ref1 = err.code) !== 'ENOENT' && ref1 !== 'EPERM') {
          throw err;
        }
      }
    };
    outputPath = function(source, base, extension) {
      var basename,
          dir,
          srcDir;
      if (extension == null) {
        extension = ".js";
      }
      basename = helpers.baseFileName(source, true, useWinPathSep);
      srcDir = path.dirname(source);
      if (!opts.output) {
        dir = srcDir;
      } else if (source === base) {
        dir = opts.output;
      } else {
        dir = path.join(opts.output, path.relative(base, srcDir));
      }
      return path.join(dir, basename + extension);
    };
    mkdirp = function(dir, fn) {
      var mkdirs,
          mode;
      mode = 0x1ff & ~process.umask();
      return (mkdirs = function(p, fn) {
        return fs.exists(p, function(exists) {
          if (exists) {
            return fn();
          } else {
            return mkdirs(path.dirname(p), function() {
              return fs.mkdir(p, mode, function(err) {
                if (err) {
                  return fn(err);
                }
                return fn();
              });
            });
          }
        });
      })(dir, fn);
    };
    writeJs = function(base, sourcePath, js, jsPath, generatedSourceMap) {
      var compile,
          jsDir,
          sourceMapPath;
      if (generatedSourceMap == null) {
        generatedSourceMap = null;
      }
      sourceMapPath = outputPath(sourcePath, base, ".js.map");
      jsDir = path.dirname(jsPath);
      compile = function() {
        if (opts.compile) {
          if (js.length <= 0) {
            js = ' ';
          }
          if (generatedSourceMap) {
            js = js + "\n//# sourceMappingURL=" + (helpers.baseFileName(sourceMapPath, false, useWinPathSep)) + "\n";
          }
          fs.writeFile(jsPath, js, function(err) {
            if (err) {
              printLine(err.message);
              return process.exit(1);
            } else if (opts.compile && opts.watch) {
              return timeLog("compiled " + sourcePath);
            }
          });
        }
        if (generatedSourceMap) {
          return fs.writeFile(sourceMapPath, generatedSourceMap, function(err) {
            if (err) {
              printLine("Could not write source map: " + err.message);
              return process.exit(1);
            }
          });
        }
      };
      return fs.exists(jsDir, function(itExists) {
        if (itExists) {
          return compile();
        } else {
          return mkdirp(jsDir, compile);
        }
      });
    };
    wait = function(milliseconds, func) {
      return setTimeout(func, milliseconds);
    };
    timeLog = function(message) {
      return console.log(((new Date).toLocaleTimeString()) + " - " + message);
    };
    printTokens = function(tokens) {
      var strings,
          tag,
          token,
          value;
      strings = (function() {
        var i,
            len,
            results;
        results = [];
        for (i = 0, len = tokens.length; i < len; i++) {
          token = tokens[i];
          tag = token[0];
          value = token[1].toString().replace(/\n/, '\\n');
          results.push("[" + tag + " " + value + "]");
        }
        return results;
      })();
      return printLine(strings.join(' '));
    };
    parseOptions = function() {
      var o;
      optionParser = new optparse.OptionParser(SWITCHES, BANNER);
      o = opts = optionParser.parse(process.argv.slice(2));
      o.compile || (o.compile = !!o.output);
      o.run = !(o.compile || o.print || o.map);
      return o.print = !!(o.print || (o["eval"] || o.stdio && o.compile));
    };
    compileOptions = function(filename, base) {
      var answer,
          cwd,
          jsDir,
          jsPath;
      answer = {
        filename: filename,
        literate: opts.literate || helpers.isLiterate(filename),
        bare: opts.bare,
        header: opts.compile && !opts['no-header'],
        sourceMap: opts.map,
        inlineMap: opts['inline-map']
      };
      if (filename) {
        if (base) {
          cwd = process.cwd();
          jsPath = outputPath(filename, base);
          jsDir = path.dirname(jsPath);
          answer = helpers.merge(answer, {
            jsPath: jsPath,
            sourceRoot: path.relative(jsDir, cwd),
            sourceFiles: [path.relative(cwd, filename)],
            generatedFile: helpers.baseFileName(jsPath, false, useWinPathSep)
          });
        } else {
          answer = helpers.merge(answer, {
            sourceRoot: "",
            sourceFiles: [helpers.baseFileName(filename, false, useWinPathSep)],
            generatedFile: helpers.baseFileName(filename, true, useWinPathSep) + ".js"
          });
        }
      }
      return answer;
    };
    forkNode = function() {
      var args,
          nodeArgs,
          p;
      nodeArgs = opts.nodejs.split(/\s+/);
      args = process.argv.slice(1);
      args.splice(args.indexOf('--nodejs'), 2);
      p = spawn(process.execPath, nodeArgs.concat(args), {
        cwd: process.cwd(),
        env: process.env,
        stdio: [0, 1, 2]
      });
      return p.on('exit', function(code) {
        return process.exit(code);
      });
    };
    usage = function() {
      return printLine((new optparse.OptionParser(SWITCHES, BANNER)).help());
    };
    version = function() {
      return printLine("CoffeeScript version " + CoffeeScript.VERSION);
    };
  }).call(this);
})(require('buffer').Buffer, require('process'));
