/* */ 
(function(process) {
  'use strict';
  var fs = require('fs');
  var path = require('path');
  var Promise = require('bluebird');
  var join = path.join;
  var resolve = path.resolve;
  var extname = path.extname;
  var dirname = path.dirname;
  var readCache = {};
  var cacheStore = {};
  var requires = {};
  exports.clearCache = function() {
    cacheStore = {};
  };
  function cache(options, compiled) {
    if (compiled && options.filename && options.cache) {
      delete readCache[options.filename];
      cacheStore[options.filename] = compiled;
      return compiled;
    }
    if (options.filename && options.cache) {
      return cacheStore[options.filename];
    }
    return compiled;
  }
  function read(path, options, fn) {
    var str = readCache[path];
    var cached = options.cache && str && typeof str === 'string';
    if (cached)
      return fn(null, str);
    fs.readFile(path, 'utf8', function(err, str) {
      if (err)
        return fn(err);
      str = str.replace(/^\uFEFF/, '');
      if (options.cache)
        readCache[path] = str;
      fn(null, str);
    });
  }
  function readPartials(path, options, fn) {
    if (!options.partials)
      return fn();
    var partials = options.partials;
    var keys = Object.keys(partials);
    function next(index) {
      if (index === keys.length)
        return fn(null);
      var key = keys[index];
      var file = join(dirname(path), partials[key] + extname(path));
      read(file, options, function(err, str) {
        if (err)
          return fn(err);
        options.partials[key] = str;
        next(++index);
      });
    }
    next(0);
  }
  function promisify(fn, exec) {
    return new Promise(function(res, rej) {
      fn = fn || function(err, html) {
        if (err) {
          return rej(err);
        }
        res(html);
      };
      exec(fn);
    });
  }
  function fromStringRenderer(name) {
    return function(path, options, fn) {
      options.filename = path;
      return promisify(fn, function(fn) {
        readPartials(path, options, function(err) {
          if (err)
            return fn(err);
          if (cache(options)) {
            exports[name].render('', options, fn);
          } else {
            read(path, options, function(err, str) {
              if (err)
                return fn(err);
              exports[name].render(str, options, fn);
            });
          }
        });
      });
    };
  }
  exports.liquid = fromStringRenderer('liquid');
  exports.liquid.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.liquid || (requires.liquid = require('tinyliquid'));
      try {
        var context = engine.newContext();
        var k;
        if (options.locals) {
          for (k in options.locals) {
            context.setLocals(k, options.locals[k]);
          }
          delete options.locals;
        }
        if (options.meta) {
          context.setLocals('page', options.meta);
          delete options.meta;
        }
        if (options.filters) {
          for (k in options.filters) {
            context.setFilter(k, options.filters[k]);
          }
          delete options.filters;
        }
        var includeDir = options.includeDir || process.cwd();
        context.onInclude(function(name, callback) {
          var extname = path.extname(name) ? '' : '.liquid';
          var filename = path.resolve(includeDir, name + extname);
          fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
            if (err)
              return callback(err);
            callback(null, engine.parse(data));
          });
        });
        delete options.includeDir;
        var compileOptions = {customTags: {}};
        if (options.customTags) {
          var tagFunctions = options.customTags;
          for (k in options.customTags) {
            compileOptions.customTags[k] = function(context, name, body) {
              var tpl = tagFunctions[name](body.trim());
              context.astStack.push(engine.parse(tpl));
            };
          }
          delete options.customTags;
        }
        for (k in options) {
          context.setLocals(k, options[k]);
        }
        var tmpl = cache(context) || cache(context, engine.compile(str, compileOptions));
        tmpl(context, fn);
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.jade = function(path, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.jade;
      if (!engine) {
        try {
          engine = requires.jade = require('jade');
        } catch (err) {
          try {
            engine = requires.jade = require('then-jade');
          } catch (otherError) {
            throw err;
          }
        }
      }
      try {
        var tmpl = cache(options) || cache(options, engine.compileFile(path, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.jade.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.jade;
      if (!engine) {
        try {
          engine = requires.jade = require('jade');
        } catch (err) {
          try {
            engine = requires.jade = require('then-jade');
          } catch (otherError) {
            throw err;
          }
        }
      }
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.dust = fromStringRenderer('dust');
  exports.dust.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.dust;
      if (!engine) {
        try {
          engine = requires.dust = require('dust');
        } catch (err) {
          try {
            engine = requires.dust = require('dustjs-helpers');
          } catch (err) {
            engine = requires.dust = require('dustjs-linkedin');
          }
        }
      }
      var ext = 'dust';
      var views = '.';
      if (options) {
        if (options.ext)
          ext = options.ext;
        if (options.views)
          views = options.views;
        if (options.settings && options.settings.views)
          views = options.settings.views;
      }
      if (!options || (options && !options.cache))
        engine.cache = {};
      engine.onLoad = function(path, callback) {
        if ('' === extname(path))
          path += '.' + ext;
        if ('/' !== path[0])
          path = views + '/' + path;
        read(path, options, callback);
      };
      try {
        var tmpl = cache(options) || cache(options, engine.compileFn(str));
        tmpl(options, fn);
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.swig = fromStringRenderer('swig');
  exports.swig.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.swig || (requires.swig = require('swig'));
      try {
        if (options.cache === true)
          options.cache = 'memory';
        engine.setDefaults({cache: options.cache});
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.atpl = fromStringRenderer('atpl');
  exports.atpl.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.atpl || (requires.atpl = require('atpl'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.liquor = fromStringRenderer('liquor');
  exports.liquor.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.liquor || (requires.liquor = require('liquor'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.twig = fromStringRenderer('twig');
  exports.twig.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.twig || (requires.twig = require('twig').twig);
      var templateData = {data: str};
      try {
        var tmpl = cache(templateData) || cache(templateData, engine(templateData));
        fn(null, tmpl.render(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.ejs = fromStringRenderer('ejs');
  exports.ejs.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.ejs || (requires.ejs = require('ejs'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.eco = fromStringRenderer('eco');
  exports.eco.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.eco || (requires.eco = require('eco'));
      try {
        fn(null, engine.render(str, options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.jazz = fromStringRenderer('jazz');
  exports.jazz.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.jazz || (requires.jazz = require('jazz'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        tmpl.eval(options, function(str) {
          fn(null, str);
        });
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.jqtpl = fromStringRenderer('jqtpl');
  exports.jqtpl.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.jqtpl || (requires.jqtpl = require('jqtpl'));
      try {
        engine.template(str, str);
        fn(null, engine.tmpl(str, options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.haml = fromStringRenderer('haml');
  exports.haml.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.haml || (requires.haml = require('hamljs'));
      try {
        options.locals = options;
        fn(null, engine.render(str, options).trimLeft());
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.hamlet = fromStringRenderer('hamlet');
  exports.hamlet.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.hamlet || (requires.hamlet = require('hamlet'));
      try {
        options.locals = options;
        fn(null, engine.render(str, options).trimLeft());
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.whiskers = function(path, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.whiskers || (requires.whiskers = require('whiskers'));
      engine.__express(path, options, fn);
    });
  };
  exports.whiskers.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.whiskers || (requires.whiskers = require('whiskers'));
      try {
        fn(null, engine.render(str, options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports['haml-coffee'] = fromStringRenderer('haml-coffee');
  exports['haml-coffee'].render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires['haml-coffee'] || (requires['haml-coffee'] = require('haml-coffee'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.hogan = fromStringRenderer('hogan');
  exports.hogan.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.hogan || (requires.hogan = require('hogan.js'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl.render(options, options.partials));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.templayed = fromStringRenderer('templayed');
  exports.templayed.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.templayed || (requires.templayed = require('templayed'));
      try {
        var tmpl = cache(options) || cache(options, engine(str));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.handlebars = fromStringRenderer('handlebars');
  exports.handlebars.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.handlebars || (requires.handlebars = require('handlebars'));
      try {
        for (var partial in options.partials) {
          engine.registerPartial(partial, options.partials[partial]);
        }
        for (var helper in options.helpers) {
          engine.registerHelper(helper, options.helpers[helper]);
        }
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.underscore = fromStringRenderer('underscore');
  exports.underscore.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.underscore || (requires.underscore = require('underscore'));
      try {
        var tmpl = cache(options) || cache(options, engine.template(str, null, options));
        fn(null, tmpl(options).replace(/\n$/, ''));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.lodash = fromStringRenderer('lodash');
  exports.lodash.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.lodash || (requires.lodash = require('lodash'));
      try {
        var tmpl = cache(options) || cache(options, engine.template(str, options));
        fn(null, tmpl(options).replace(/\n$/, ''));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.pug = function(path, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.pug;
      if (!engine) {
        try {
          engine = requires.pug = require('pug');
        } catch (err) {
          try {
            engine = requires.pug = require('then-pug');
          } catch (otherError) {
            throw err;
          }
        }
      }
      try {
        var tmpl = cache(options) || cache(options, engine.compileFile(path, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.pug.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.pug;
      if (!engine) {
        try {
          engine = requires.pug = require('pug');
        } catch (err) {
          try {
            engine = requires.pug = require('then-pug');
          } catch (otherError) {
            throw err;
          }
        }
      }
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.qejs = fromStringRenderer('qejs');
  exports.qejs.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      try {
        var engine = requires.qejs || (requires.qejs = require('qejs'));
        engine.render(str, options).then(function(result) {
          fn(null, result);
        }, function(err) {
          fn(err);
        }).done();
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.walrus = fromStringRenderer('walrus');
  exports.walrus.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.walrus || (requires.walrus = require('walrus'));
      try {
        var tmpl = cache(options) || cache(options, engine.parse(str));
        fn(null, tmpl.compile(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.mustache = fromStringRenderer('mustache');
  exports.mustache.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.mustache || (requires.mustache = require('mustache'));
      try {
        fn(null, engine.to_html(str, options, options.partials));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.just = function(path, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.just;
      if (!engine) {
        var JUST = require('just');
        engine = requires.just = new JUST();
      }
      engine.configure({useCache: options.cache});
      engine.render(path, options, fn);
    });
  };
  exports.just.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var JUST = require('just');
      var engine = new JUST({root: {page: str}});
      engine.render('page', options, fn);
    });
  };
  exports.ect = function(path, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.ect;
      if (!engine) {
        var ECT = require('ect');
        engine = requires.ect = new ECT(options);
      }
      engine.configure({cache: options.cache});
      engine.render(path, options, fn);
    });
  };
  exports.ect.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var ECT = require('ect');
      var engine = new ECT({root: {page: str}});
      engine.render('page', options, fn);
    });
  };
  exports.mote = fromStringRenderer('mote');
  exports.mote.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.mote || (requires.mote = require('mote'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.toffee = function(path, options, fn) {
    return promisify(fn, function(fn) {
      var toffee = requires.toffee || (requires.toffee = require('toffee'));
      toffee.__consolidate_engine_render(path, options, fn);
    });
  };
  exports.toffee.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.toffee || (requires.toffee = require('toffee'));
      try {
        engine.str_render(str, options, fn);
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.dot = fromStringRenderer('dot');
  exports.dot.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.dot || (requires.dot = require('dot'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options && options._def));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.bracket = fromStringRenderer('bracket');
  exports.bracket.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.bracket || (requires.bracket = require('bracket-template'));
      try {
        var tmpl = cache(options) || cache(options, engine.default.compile(str));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.ractive = fromStringRenderer('ractive');
  exports.ractive.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.ractive || (requires.ractive = require('ractive'));
      var template = cache(options) || cache(options, engine.parse(str));
      options.template = template;
      if (options.data === null || options.data === undefined) {
        var extend = (requires.extend || (requires.extend = require('util')._extend));
        options.data = extend({}, options);
        var i,
            length;
        var properties = ["template", "filename", "cache", "partials"];
        for (i = 0, length = properties.length; i < length; i++) {
          var property = properties[i];
          delete options.data[property];
        }
      }
      try {
        fn(null, new engine(options).toHTML());
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.nunjucks = fromStringRenderer('nunjucks');
  exports.nunjucks.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      try {
        var engine = options.nunjucksEnv || requires.nunjucks || (requires.nunjucks = require('nunjucks'));
        var env = engine;
        if (options.settings && options.settings.views)
          env = engine.configure(options.settings.views);
        else if (options.nunjucks && options.nunjucks.configure)
          env = engine.configure.apply(engine, options.nunjucks.configure);
        if (options.loader) {
          env = new engine.Environment(options.loader);
        } else if (options.settings && options.settings.views) {
          env = new engine.Environment(new engine.FileSystemLoader(options.settings.views));
        } else if (options.nunjucks && options.nunjucks.loader) {
          if (typeof options.nunjucks.loader === 'string')
            env = new engine.Environment(new engine.FileSystemLoader(options.nunjucks.loader));
          else
            env = new engine.Environment(new engine.FileSystemLoader(options.nunjucks.loader[0], options.nunjucks.loader[1]));
        }
        env.renderString(str, options, fn);
      } catch (err) {
        throw fn(err);
      }
    });
  };
  exports.htmling = fromStringRenderer('htmling');
  exports.htmling.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.htmling || (requires.htmling = require('htmling'));
      try {
        var tmpl = cache(options) || cache(options, engine.string(str));
        fn(null, tmpl.render(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  function requireReact(module, filename) {
    var babel = requires.babel || (requires.babel = require('babel-core'));
    var compiled = babel.transformFileSync(filename, {presets: ['react']}).code;
    return module._compile(compiled, filename);
  }
  exports.requireReact = requireReact;
  function requireReactString(src, filename) {
    var babel = requires.babel || (requires.babel = require('babel-core'));
    if (!filename)
      filename = '';
    var m = new module.constructor();
    filename = filename || '';
    var compiled = babel.transform(src, {presets: ['react']}).code;
    m.paths = module.paths;
    m._compile(compiled, filename);
    return m.exports;
  }
  function reactBaseTmpl(data, options) {
    var exp;
    var regex;
    for (var k in options) {
      if (options.hasOwnProperty(k)) {
        exp = '{{' + k + '}}';
        regex = new RegExp(exp, 'g');
        if (data.match(regex)) {
          data = data.replace(regex, options[k]);
        }
      }
    }
    return data;
  }
  function reactRenderer(type) {
    if (require.extensions) {
      if (!require.extensions['.jsx']) {
        require.extensions['.jsx'] = requireReact;
      }
      if (!require.extensions['.react']) {
        require.extensions['.react'] = requireReact;
      }
    }
    return function(str, options, fn) {
      return promisify(fn, function(fn) {
        var ReactDOM = requires.ReactDOM || (requires.ReactDOM = require('react-dom/server'));
        var react = requires.react || (requires.react = require('react'));
        var base = options.base;
        delete options.base;
        var enableCache = options.cache;
        delete options.cache;
        var isNonStatic = options.isNonStatic;
        delete options.isNonStatic;
        try {
          var Code;
          var Factory;
          var baseStr;
          var content;
          var parsed;
          if (!cache(options)) {
            Code = (type === 'path') ? require(resolve(str)) : requireReactString(str);
            Factory = cache(options, react.createFactory(Code));
          } else {
            Factory = cache(options);
          }
          parsed = new Factory(options);
          content = (isNonStatic) ? ReactDOM.renderToString(parsed) : ReactDOM.renderToStaticMarkup(parsed);
          if (base) {
            baseStr = readCache[str] || fs.readFileSync(resolve(base), 'utf8');
            if (enableCache) {
              readCache[str] = baseStr;
            }
            options.content = content;
            content = reactBaseTmpl(baseStr, options);
          }
          fn(null, content);
        } catch (err) {
          fn(err);
        }
      });
    };
  }
  exports.react = reactRenderer('path');
  exports.react.render = reactRenderer('string');
  exports['arc-templates'] = fromStringRenderer('arc-templates');
  exports['arc-templates'].render = function(str, options, fn) {
    var readFileWithOptions = Promise.promisify(read);
    var consolidateFileSystem = {};
    consolidateFileSystem.readFile = function(path) {
      return readFileWithOptions(path, options);
    };
    return promisify(fn, function(fn) {
      try {
        var engine = requires['arc-templates'];
        if (!engine) {
          var Engine = require('arc-templates/dist/es5');
          engine = requires['arc-templates'] = new Engine({filesystem: consolidateFileSystem});
        }
        var compiler = cache(options) || cache(options, engine.compileString(str, options.filename));
        compiler.then(function(func) {
          return func(options);
        }).then(function(result) {
          fn(null, result.content);
        }).catch(fn);
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.vash = fromStringRenderer('vash');
  exports.vash.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.vash || (requires.vash = require('vash'));
      try {
        if (options.helpers) {
          for (var key in options.helpers) {
            if (!options.helpers.hasOwnProperty(key) || typeof options.helpers[key] !== 'function') {
              continue;
            }
            engine.helpers[key] = options.helpers[key];
          }
        }
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options).replace(/\n$/, ''));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.slm = fromStringRenderer('slm');
  exports.slm.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.slm || (requires.slm = require('slm'));
      try {
        var tmpl = cache(options) || cache(options, engine.compile(str, options));
        fn(null, tmpl(options));
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.marko = function(path, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.marko || (requires.marko = require('marko'));
      options.writeToDisk = !!options.cache;
      try {
        var tmpl = cache(options) || cache(options, engine.load(path, options));
        tmpl.render(options, fn);
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.marko.render = function(str, options, fn) {
    return promisify(fn, function(fn) {
      var engine = requires.marko || (requires.marko = require('marko'));
      options.writeToDisk = !!options.cache;
      try {
        var tmpl = cache(options) || cache(options, engine.load('string.marko', str, options));
        tmpl.render(options, fn);
      } catch (err) {
        fn(err);
      }
    });
  };
  exports.requires = requires;
})(require('process'));
