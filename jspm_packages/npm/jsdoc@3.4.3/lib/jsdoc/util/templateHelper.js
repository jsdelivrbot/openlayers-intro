/* */ 
(function(process) {
  'use strict';
  var catharsis = require('catharsis');
  var dictionary = require('../../../tag/dictionary');
  var env = require('../../../env');
  var name = require('../../../name');
  var util = require('util');
  var hasOwnProp = Object.prototype.hasOwnProperty;
  var MODULE_NAMESPACE = 'module:';
  var files = {};
  var ids = {};
  var containers = ['class', 'module', 'external', 'namespace', 'mixin', 'interface'];
  var tutorials;
  exports.setTutorials = function(root) {
    tutorials = root;
  };
  exports.globalName = name.SCOPE.NAMES.GLOBAL;
  exports.fileExtension = '.html';
  exports.scopeToPunc = name.scopeToPunc;
  var linkMap = {
    longnameToUrl: {},
    urlToLongname: {},
    longnameToId: {}
  };
  var tutorialLinkMap = {
    nameToUrl: {},
    urlToName: {}
  };
  var longnameToUrl = exports.longnameToUrl = linkMap.longnameToUrl;
  var longnameToId = exports.longnameToId = linkMap.longnameToId;
  var registerLink = exports.registerLink = function(longname, fileUrl) {
    linkMap.longnameToUrl[longname] = fileUrl;
    linkMap.urlToLongname[fileUrl] = longname;
  };
  var registerId = exports.registerId = function(longname, fragment) {
    linkMap.longnameToId[longname] = fragment;
  };
  function getNamespace(kind) {
    if (dictionary.isNamespace(kind)) {
      return kind + ':';
    }
    return '';
  }
  function formatNameForLink(doclet, options) {
    var newName = getNamespace(doclet.kind) + (doclet.name || '') + (doclet.variation || '');
    var scopePunc = exports.scopeToPunc[doclet.scope] || '';
    if (scopePunc !== '#') {
      newName = scopePunc + newName;
    }
    return newName;
  }
  function makeUniqueFilename(filename, str) {
    var key = filename.toLowerCase();
    var nonUnique = true;
    if (!filename.length || filename[0] === '_') {
      filename = '-' + filename;
      key = filename.toLowerCase();
    }
    while (nonUnique) {
      if (hasOwnProp.call(files, key)) {
        filename += '_';
        key = filename.toLowerCase();
      } else {
        nonUnique = false;
      }
    }
    files[key] = str;
    return filename;
  }
  var getUniqueFilename = exports.getUniqueFilename = function(str) {
    var namespaces = dictionary.getNamespaces().join('|');
    var basename = (str || '').replace(new RegExp('^(' + namespaces + '):'), '$1-').replace(/[\\\/?*:|'"<>]/g, '_').replace(/~/g, '-').replace(/\#/g, '_').replace(/\//g, '_').replace(/\([\s\S]*\)$/, '').replace(/^[\.\-]/, '');
    basename = basename.length ? basename : '_';
    return makeUniqueFilename(basename, str) + exports.fileExtension;
  };
  function getFilename(longname) {
    var fileUrl;
    if (hasOwnProp.call(longnameToUrl, longname)) {
      fileUrl = longnameToUrl[longname];
    } else {
      fileUrl = getUniqueFilename(longname);
      registerLink(longname, fileUrl);
    }
    return fileUrl;
  }
  function isModuleExports(doclet) {
    return doclet.longname && doclet.longname === doclet.name && doclet.longname.indexOf(MODULE_NAMESPACE) === 0 && doclet.kind !== 'module';
  }
  function makeUniqueId(filename, id) {
    var key;
    var nonUnique = true;
    key = id.toLowerCase();
    id = id.replace(/\s/g, '');
    while (nonUnique) {
      if (hasOwnProp.call(ids, filename) && hasOwnProp.call(ids[filename], key)) {
        id += '_';
        key = id.toLowerCase();
      } else {
        nonUnique = false;
      }
    }
    ids[filename] = ids[filename] || {};
    ids[filename][key] = id;
    return id;
  }
  function getId(longname, id) {
    if (hasOwnProp.call(longnameToId, longname)) {
      id = longnameToId[longname];
    } else if (!id) {
      return '';
    } else {
      id = makeUniqueId(longname, id);
      registerId(longname, id);
    }
    return id;
  }
  var getUniqueId = exports.getUniqueId = makeUniqueId;
  var htmlsafe = exports.htmlsafe = function(str) {
    if (typeof str !== 'string') {
      str = String(str);
    }
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  };
  function parseType(longname) {
    var err;
    try {
      return catharsis.parse(longname, {jsdoc: true});
    } catch (e) {
      err = new Error('unable to parse ' + longname + ': ' + e.message);
      require('../../../util/logger').error(err);
      return longname;
    }
  }
  function stringifyType(parsedType, cssClass, stringifyLinkMap) {
    return require('catharsis').stringify(parsedType, {
      cssClass: cssClass,
      htmlSafe: true,
      links: stringifyLinkMap
    });
  }
  function hasUrlPrefix(text) {
    return (/^(http|ftp)s?:\/\//).test(text);
  }
  function isComplexTypeExpression(expr) {
    return /^{.+}$/.test(expr) || /^.+\|.+$/.test(expr) || /^.+<.+>$/.test(expr);
  }
  function fragmentHash(fragmentId) {
    if (!fragmentId) {
      return '';
    }
    return '#' + fragmentId;
  }
  function buildLink(longname, linkText, options) {
    var classString = options.cssClass ? util.format(' class="%s"', options.cssClass) : '';
    var fileUrl;
    var fragmentString = fragmentHash(options.fragmentId);
    var stripped;
    var text;
    var parsedType;
    stripped = longname ? longname.replace(/^<|>$/g, '') : '';
    if (hasUrlPrefix(stripped)) {
      fileUrl = stripped;
      text = linkText || stripped;
    } else if (longname && isComplexTypeExpression(longname) && /\{\@.+\}/.test(longname) === false && /^<[\s\S]+>/.test(longname) === false) {
      parsedType = parseType(longname);
      return stringifyType(parsedType, options.cssClass, options.linkMap);
    } else {
      fileUrl = hasOwnProp.call(options.linkMap, longname) ? options.linkMap[longname] : '';
      text = linkText || longname;
    }
    text = options.monospace ? '<code>' + text + '</code>' : text;
    if (!fileUrl) {
      return text;
    } else {
      return util.format('<a href="%s"%s>%s</a>', encodeURI(fileUrl + fragmentString), classString, text);
    }
  }
  var linkto = exports.linkto = function(longname, linkText, cssClass, fragmentId) {
    return buildLink(longname, linkText, {
      cssClass: cssClass,
      fragmentId: fragmentId,
      linkMap: longnameToUrl
    });
  };
  function useMonospace(tag, text) {
    var cleverLinks;
    var monospaceLinks;
    var result;
    if (hasUrlPrefix(text)) {
      result = false;
    } else if (tag === 'linkplain') {
      result = false;
    } else if (tag === 'linkcode') {
      result = true;
    } else {
      cleverLinks = env.conf.templates.cleverLinks;
      monospaceLinks = env.conf.templates.monospaceLinks;
      if (monospaceLinks || cleverLinks) {
        result = true;
      }
    }
    return result || false;
  }
  function splitLinkText(text) {
    var linkText;
    var target;
    var splitIndex;
    splitIndex = text.indexOf('|');
    if (splitIndex === -1) {
      splitIndex = text.search(/\s/);
    }
    if (splitIndex !== -1) {
      linkText = text.substr(splitIndex + 1);
      linkText = linkText.replace(/\n+/, ' ');
      target = text.substr(0, splitIndex);
    }
    return {
      linkText: linkText,
      target: target || text
    };
  }
  var tutorialToUrl = exports.tutorialToUrl = function(tutorial) {
    var fileUrl;
    var node = tutorials.getByName(tutorial);
    if (!node) {
      require('../../../util/logger').error(new Error('No such tutorial: ' + tutorial));
      return null;
    }
    if (!hasOwnProp.call(tutorialLinkMap.nameToUrl, node.name)) {
      fileUrl = 'tutorial-' + getUniqueFilename(node.name);
      tutorialLinkMap.nameToUrl[node.name] = fileUrl;
      tutorialLinkMap.urlToName[fileUrl] = node.name;
    }
    return tutorialLinkMap.nameToUrl[node.name];
  };
  var toTutorial = exports.toTutorial = function(tutorial, content, missingOpts) {
    if (!tutorial) {
      require('../../../util/logger').error(new Error('Missing required parameter: tutorial'));
      return null;
    }
    var node = tutorials.getByName(tutorial);
    if (!node) {
      missingOpts = missingOpts || {};
      var tag = missingOpts.tag;
      var classname = missingOpts.classname;
      var link = tutorial;
      if (missingOpts.prefix) {
        link = missingOpts.prefix + link;
      }
      if (tag) {
        link = '<' + tag + (classname ? (' class="' + classname + '">') : '>') + link;
        link += '</' + tag + '>';
      }
      return link;
    }
    content = content || node.title;
    return '<a href="' + tutorialToUrl(tutorial) + '">' + content + '</a>';
  };
  exports.resolveLinks = function(str) {
    var replaceInlineTags = require('../../../tag/inline').replaceInlineTags;
    function extractLeadingText(string, completeTag) {
      var tagIndex = string.indexOf(completeTag);
      var leadingText = null;
      var leadingTextRegExp = /\[(.+?)\]/g;
      var leadingTextInfo = leadingTextRegExp.exec(string);
      while (leadingTextInfo && leadingTextInfo.length) {
        if (leadingTextInfo.index + leadingTextInfo[0].length === tagIndex) {
          string = string.replace(leadingTextInfo[0], '');
          leadingText = leadingTextInfo[1];
          break;
        }
        leadingTextInfo = leadingTextRegExp.exec(string);
      }
      return {
        leadingText: leadingText,
        string: string
      };
    }
    function processLink(string, tagInfo) {
      var leading = extractLeadingText(string, tagInfo.completeTag);
      var linkText = leading.leadingText;
      var monospace;
      var split;
      var target;
      string = leading.string;
      split = splitLinkText(tagInfo.text);
      target = split.target;
      linkText = linkText || split.linkText;
      monospace = useMonospace(tagInfo.tag, tagInfo.text);
      return string.replace(tagInfo.completeTag, buildLink(target, linkText, {
        linkMap: longnameToUrl,
        monospace: monospace
      }));
    }
    function processTutorial(string, tagInfo) {
      var leading = extractLeadingText(string, tagInfo.completeTag);
      string = leading.string;
      return string.replace(tagInfo.completeTag, toTutorial(tagInfo.text, leading.leadingText));
    }
    var replacers = {
      link: processLink,
      linkcode: processLink,
      linkplain: processLink,
      tutorial: processTutorial
    };
    return replaceInlineTags(str, replacers).newString;
  };
  exports.resolveAuthorLinks = function(str) {
    var author;
    var matches = str.match(/^\s?([\s\S]+)\b\s+<(\S+@\S+)>\s?$/);
    if (matches && matches.length === 3) {
      author = '<a href="mailto:' + matches[2] + '">' + htmlsafe(matches[1]) + '</a>';
    } else {
      author = htmlsafe(str);
    }
    return author;
  };
  var find = exports.find = function(data, spec) {
    return data(spec).get();
  };
  exports.getMembers = function(data) {
    var members = {
      classes: find(data, {kind: 'class'}),
      externals: find(data, {kind: 'external'}),
      events: find(data, {kind: 'event'}),
      globals: find(data, {
        kind: ['member', 'function', 'constant', 'typedef'],
        memberof: {isUndefined: true}
      }),
      mixins: find(data, {kind: 'mixin'}),
      modules: find(data, {kind: 'module'}),
      namespaces: find(data, {kind: 'namespace'}),
      interfaces: find(data, {kind: 'interface'})
    };
    members.externals = members.externals.map(function(doclet) {
      doclet.name = doclet.name.replace(/(^"|"$)/g, '');
      return doclet;
    });
    members.globals = members.globals.filter(function(doclet) {
      return !isModuleExports(doclet);
    });
    return members;
  };
  exports.getAttribs = function(d) {
    var attribs = [];
    if (!d) {
      return attribs;
    }
    if (d.virtual) {
      attribs.push('abstract');
    }
    if (d.access && d.access !== 'public') {
      attribs.push(d.access);
    }
    if (d.scope && d.scope !== 'instance' && d.scope !== name.SCOPE.NAMES.GLOBAL) {
      if (d.kind === 'function' || d.kind === 'member' || d.kind === 'constant') {
        attribs.push(d.scope);
      }
    }
    if (d.readonly === true) {
      if (d.kind === 'member') {
        attribs.push('readonly');
      }
    }
    if (d.kind === 'constant') {
      attribs.push('constant');
    }
    if (d.nullable === true) {
      attribs.push('nullable');
    } else if (d.nullable === false) {
      attribs.push('non-null');
    }
    return attribs;
  };
  exports.getSignatureTypes = function(d, cssClass) {
    var types = [];
    if (d.type && d.type.names) {
      types = d.type.names;
    }
    if (types && types.length) {
      types = types.map(function(t) {
        return linkto(t, htmlsafe(t), cssClass);
      });
    }
    return types;
  };
  exports.getSignatureParams = function(d, optClass) {
    var pnames = [];
    if (d.params) {
      d.params.forEach(function(p) {
        if (p.name && p.name.indexOf('.') === -1) {
          if (p.optional && optClass) {
            pnames.push('<span class="' + optClass + '">' + p.name + '</span>');
          } else {
            pnames.push(p.name);
          }
        }
      });
    }
    return pnames;
  };
  exports.getSignatureReturns = function(d, cssClass) {
    var returnTypes = [];
    if (d.returns) {
      d.returns.forEach(function(r) {
        if (r && r.type && r.type.names) {
          if (!returnTypes.length) {
            returnTypes = r.type.names;
          }
        }
      });
    }
    if (returnTypes && returnTypes.length) {
      returnTypes = returnTypes.map(function(r) {
        return linkto(r, htmlsafe(r), cssClass);
      });
    }
    return returnTypes;
  };
  exports.getAncestors = function(data, doclet) {
    var ancestors = [];
    var doc = doclet;
    var previousDoc;
    while (doc) {
      previousDoc = doc;
      doc = find(data, {longname: doc.memberof})[0];
      if (previousDoc === doc) {
        break;
      }
      if (doc) {
        ancestors.unshift(doc);
      }
    }
    return ancestors;
  };
  exports.getAncestorLinks = function(data, doclet, cssClass) {
    var ancestors = exports.getAncestors(data, doclet);
    var links = [];
    ancestors.forEach(function(ancestor) {
      var linkText = (exports.scopeToPunc[ancestor.scope] || '') + ancestor.name;
      var link = linkto(ancestor.longname, linkText, cssClass);
      links.push(link);
    });
    if (links.length) {
      links[links.length - 1] += (exports.scopeToPunc[doclet.scope] || '');
    }
    return links;
  };
  exports.addEventListeners = function(data) {
    var listeners = find(data, function() {
      return this.listens && this.listens.length;
    });
    if (!listeners.length) {
      return;
    }
    var doc,
        l,
        _events = {};
    listeners.forEach(function(listener) {
      l = listener.listens;
      l.forEach(function(eventLongname) {
        doc = _events[eventLongname] || find(data, {
          longname: eventLongname,
          kind: 'event'
        })[0];
        if (doc) {
          if (!doc.listeners) {
            doc.listeners = [listener.longname];
          } else {
            doc.listeners.push(listener.longname);
          }
          _events[eventLongname] = _events[eventLongname] || doc;
        }
      });
    });
  };
  exports.prune = function(data) {
    data({undocumented: true}).remove();
    data({ignore: true}).remove();
    data({memberof: '<anonymous>'}).remove();
    if (!env.opts.access || (env.opts.access && env.opts.access.indexOf('all') === -1)) {
      if (env.opts.access && env.opts.access.indexOf('public') === -1) {
        data({access: 'public'}).remove();
      }
      if (env.opts.access && env.opts.access.indexOf('protected') === -1) {
        data({access: 'protected'}).remove();
      }
      if (!env.opts.private && (!env.opts.access || (env.opts.access && env.opts.access.indexOf('private') === -1))) {
        data({access: 'private'}).remove();
      }
      if (env.opts.access && env.opts.access.indexOf('undefined') === -1) {
        data({access: {isUndefined: true}}).remove();
      }
    }
    return data;
  };
  exports.createLink = function(doclet) {
    var fakeContainer;
    var filename;
    var fileUrl;
    var fragment = '';
    var longname = doclet.longname;
    var match;
    if (containers.indexOf(doclet.kind) === -1) {
      match = /(\S+):/.exec(longname);
      if (match && containers.indexOf(match[1]) !== -1) {
        fakeContainer = match[1];
      }
    }
    if (containers.indexOf(doclet.kind) !== -1 || isModuleExports(doclet)) {
      filename = getFilename(longname);
    } else if (containers.indexOf(doclet.kind) === -1 && fakeContainer) {
      filename = getFilename(doclet.memberof || longname);
      if (doclet.name !== doclet.longname) {
        fragment = formatNameForLink(doclet);
        fragment = getId(longname, fragment);
      }
    } else {
      filename = getFilename(doclet.memberof || exports.globalName);
      if ((doclet.name !== doclet.longname) || (doclet.scope === name.SCOPE.NAMES.GLOBAL)) {
        fragment = formatNameForLink(doclet);
        fragment = getId(longname, fragment);
      }
    }
    fileUrl = encodeURI(filename + fragmentHash(fragment));
    return fileUrl;
  };
  exports.longnamesToTree = name.longnamesToTree;
  exports._replaceDictionary = function _replaceDictionary(dict) {
    dictionary = dict;
  };
})(require('process'));
