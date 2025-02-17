/* */ 
(function(process) {
  (function() {
    var CoffeeScript,
        cakefileDirectory,
        fatalError,
        fs,
        helpers,
        missingTask,
        oparse,
        options,
        optparse,
        path,
        printTasks,
        switches,
        tasks;
    fs = require('fs');
    path = require('path');
    helpers = require('./helpers');
    optparse = require('./optparse');
    CoffeeScript = require('./coffee-script');
    CoffeeScript.register();
    tasks = {};
    options = {};
    switches = [];
    oparse = null;
    helpers.extend(global, {
      task: function(name, description, action) {
        var ref;
        if (!action) {
          ref = [description, action], action = ref[0], description = ref[1];
        }
        return tasks[name] = {
          name: name,
          description: description,
          action: action
        };
      },
      option: function(letter, flag, description) {
        return switches.push([letter, flag, description]);
      },
      invoke: function(name) {
        if (!tasks[name]) {
          missingTask(name);
        }
        return tasks[name].action(options);
      }
    });
    exports.run = function() {
      var arg,
          args,
          e,
          i,
          len,
          ref,
          results;
      global.__originalDirname = fs.realpathSync('.');
      process.chdir(cakefileDirectory(__originalDirname));
      args = process.argv.slice(2);
      CoffeeScript.run(fs.readFileSync('Cakefile').toString(), {filename: 'Cakefile'});
      oparse = new optparse.OptionParser(switches);
      if (!args.length) {
        return printTasks();
      }
      try {
        options = oparse.parse(args);
      } catch (error) {
        e = error;
        return fatalError("" + e);
      }
      ref = options["arguments"];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        arg = ref[i];
        results.push(invoke(arg));
      }
      return results;
    };
    printTasks = function() {
      var cakefilePath,
          desc,
          name,
          relative,
          spaces,
          task;
      relative = path.relative || path.resolve;
      cakefilePath = path.join(relative(__originalDirname, process.cwd()), 'Cakefile');
      console.log(cakefilePath + " defines the following tasks:\n");
      for (name in tasks) {
        task = tasks[name];
        spaces = 20 - name.length;
        spaces = spaces > 0 ? Array(spaces + 1).join(' ') : '';
        desc = task.description ? "# " + task.description : '';
        console.log("cake " + name + spaces + " " + desc);
      }
      if (switches.length) {
        return console.log(oparse.help());
      }
    };
    fatalError = function(message) {
      console.error(message + '\n');
      console.log('To see a list of all tasks/options, run "cake"');
      return process.exit(1);
    };
    missingTask = function(task) {
      return fatalError("No such task: " + task);
    };
    cakefileDirectory = function(dir) {
      var parent;
      if (fs.existsSync(path.join(dir, 'Cakefile'))) {
        return dir;
      }
      parent = path.normalize(path.join(dir, '..'));
      if (parent !== dir) {
        return cakefileDirectory(parent);
      }
      throw new Error("Cakefile not found in " + (process.cwd()));
    };
  }).call(this);
})(require('process'));
