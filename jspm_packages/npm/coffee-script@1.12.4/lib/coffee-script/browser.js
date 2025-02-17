/* */ 
(function() {
  var CoffeeScript,
      compile,
      runScripts,
      indexOf = [].indexOf || function(item) {
        for (var i = 0,
            l = this.length; i < l; i++) {
          if (i in this && this[i] === item)
            return i;
        }
        return -1;
      };
  CoffeeScript = require('./coffee-script');
  CoffeeScript.require = require;
  compile = CoffeeScript.compile;
  CoffeeScript["eval"] = function(code, options) {
    if (options == null) {
      options = {};
    }
    if (options.bare == null) {
      options.bare = true;
    }
    return eval(compile(code, options));
  };
  CoffeeScript.run = function(code, options) {
    if (options == null) {
      options = {};
    }
    options.bare = true;
    options.shiftLine = true;
    return Function(compile(code, options))();
  };
  if (typeof window === "undefined" || window === null) {
    return;
  }
  if ((typeof btoa !== "undefined" && btoa !== null) && (typeof JSON !== "undefined" && JSON !== null)) {
    compile = function(code, options) {
      if (options == null) {
        options = {};
      }
      options.inlineMap = true;
      return CoffeeScript.compile(code, options);
    };
  }
  CoffeeScript.load = function(url, callback, options, hold) {
    var xhr;
    if (options == null) {
      options = {};
    }
    if (hold == null) {
      hold = false;
    }
    options.sourceFiles = [url];
    xhr = window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new window.XMLHttpRequest();
    xhr.open('GET', url, true);
    if ('overrideMimeType' in xhr) {
      xhr.overrideMimeType('text/plain');
    }
    xhr.onreadystatechange = function() {
      var param,
          ref;
      if (xhr.readyState === 4) {
        if ((ref = xhr.status) === 0 || ref === 200) {
          param = [xhr.responseText, options];
          if (!hold) {
            CoffeeScript.run.apply(CoffeeScript, param);
          }
        } else {
          throw new Error("Could not load " + url);
        }
        if (callback) {
          return callback(param);
        }
      }
    };
    return xhr.send(null);
  };
  runScripts = function() {
    var coffees,
        coffeetypes,
        execute,
        fn,
        i,
        index,
        j,
        len,
        s,
        script,
        scripts;
    scripts = window.document.getElementsByTagName('script');
    coffeetypes = ['text/coffeescript', 'text/literate-coffeescript'];
    coffees = (function() {
      var j,
          len,
          ref,
          results;
      results = [];
      for (j = 0, len = scripts.length; j < len; j++) {
        s = scripts[j];
        if (ref = s.type, indexOf.call(coffeetypes, ref) >= 0) {
          results.push(s);
        }
      }
      return results;
    })();
    index = 0;
    execute = function() {
      var param;
      param = coffees[index];
      if (param instanceof Array) {
        CoffeeScript.run.apply(CoffeeScript, param);
        index++;
        return execute();
      }
    };
    fn = function(script, i) {
      var options,
          source;
      options = {literate: script.type === coffeetypes[1]};
      source = script.src || script.getAttribute('data-src');
      if (source) {
        return CoffeeScript.load(source, function(param) {
          coffees[i] = param;
          return execute();
        }, options, true);
      } else {
        options.sourceFiles = ['embedded'];
        return coffees[i] = [script.innerHTML, options];
      }
    };
    for (i = j = 0, len = coffees.length; j < len; i = ++j) {
      script = coffees[i];
      fn(script, i);
    }
    return execute();
  };
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', runScripts, false);
  } else {
    window.attachEvent('onload', runScripts);
  }
}).call(this);
