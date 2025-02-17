/* */ 
'use strict';
var url = require('url');
var gitHosts = require('./git-host-info');
var GitHost = module.exports = require('./git-host');
var protocolToRepresentationMap = {
  'git+ssh': 'sshurl',
  'git+https': 'https',
  'ssh': 'sshurl',
  'git': 'git'
};
function protocolToRepresentation(protocol) {
  if (protocol.substr(-1) === ':')
    protocol = protocol.slice(0, -1);
  return protocolToRepresentationMap[protocol] || protocol;
}
var authProtocols = {
  'git:': true,
  'https:': true,
  'git+https:': true,
  'http:': true,
  'git+http:': true
};
module.exports.fromUrl = function(giturl, opts) {
  if (giturl == null || giturl === '')
    return;
  var url = fixupUnqualifiedGist(isGitHubShorthand(giturl) ? 'github:' + giturl : giturl);
  var parsed = parseGitUrl(url);
  var shortcutMatch = url.match(new RegExp('^([^:]+):(?:(?:[^@:]+(?:[^@]+)?@)?([^/]*))[/](.+?)(?:[.]git)?($|#)'));
  var matches = Object.keys(gitHosts).map(function(gitHostName) {
    try {
      var gitHostInfo = gitHosts[gitHostName];
      var auth = null;
      if (parsed.auth && authProtocols[parsed.protocol]) {
        auth = decodeURIComponent(parsed.auth);
      }
      var committish = parsed.hash ? decodeURIComponent(parsed.hash.substr(1)) : null;
      var user = null;
      var project = null;
      var defaultRepresentation = null;
      if (shortcutMatch && shortcutMatch[1] === gitHostName) {
        user = shortcutMatch[2] && decodeURIComponent(shortcutMatch[2]);
        project = decodeURIComponent(shortcutMatch[3]);
        defaultRepresentation = 'shortcut';
      } else {
        if (parsed.host !== gitHostInfo.domain)
          return;
        if (!gitHostInfo.protocols_re.test(parsed.protocol))
          return;
        if (!parsed.path)
          return;
        var pathmatch = gitHostInfo.pathmatch;
        var matched = parsed.path.match(pathmatch);
        if (!matched)
          return;
        if (matched[1] != null)
          user = decodeURIComponent(matched[1]);
        if (matched[2] != null)
          project = decodeURIComponent(matched[2]);
        defaultRepresentation = protocolToRepresentation(parsed.protocol);
      }
      return new GitHost(gitHostName, user, auth, project, committish, defaultRepresentation, opts);
    } catch (ex) {
      if (!(ex instanceof URIError))
        throw ex;
    }
  }).filter(function(gitHostInfo) {
    return gitHostInfo;
  });
  if (matches.length !== 1)
    return;
  return matches[0];
};
function isGitHubShorthand(arg) {
  return /^[^:@%/\s.-][^:@%/\s]*[/][^:@\s/%]+(?:#.*)?$/.test(arg);
}
function fixupUnqualifiedGist(giturl) {
  var parsed = url.parse(giturl);
  if (parsed.protocol === 'gist:' && parsed.host && !parsed.path) {
    return parsed.protocol + '/' + parsed.host;
  } else {
    return giturl;
  }
}
function parseGitUrl(giturl) {
  if (typeof giturl !== 'string')
    giturl = '' + giturl;
  var matched = giturl.match(/^([^@]+)@([^:/]+):[/]?((?:[^/]+[/])?[^/]+?)(?:[.]git)?(#.*)?$/);
  if (!matched)
    return url.parse(giturl);
  return {
    protocol: 'git+ssh:',
    slashes: true,
    auth: matched[1],
    host: matched[2],
    port: null,
    hostname: matched[2],
    hash: matched[4],
    search: null,
    query: null,
    pathname: '/' + matched[3],
    path: '/' + matched[3],
    href: 'git+ssh://' + matched[1] + '@' + matched[2] + '/' + matched[3] + (matched[4] || '')
  };
}
