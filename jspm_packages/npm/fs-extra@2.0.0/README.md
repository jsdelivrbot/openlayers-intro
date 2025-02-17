Node.js: fs-extra
=================

`fs-extra` adds file system methods that aren't included in the native `fs` module. It is a drop in replacement for `fs`.

[![npm Package](https://img.shields.io/npm/v/fs-extra.svg?style=flat-square)](https://www.npmjs.org/package/fs-extra)
[![build status](https://api.travis-ci.org/jprichardson/node-fs-extra.svg)](http://travis-ci.org/jprichardson/node-fs-extra)
[![windows Build status](https://img.shields.io/appveyor/ci/jprichardson/node-fs-extra/master.svg?label=windows%20build)](https://ci.appveyor.com/project/jprichardson/node-fs-extra/branch/master)
[![downloads per month](http://img.shields.io/npm/dm/fs-extra.svg)](https://www.npmjs.org/package/fs-extra)
[![Coverage Status](https://img.shields.io/coveralls/jprichardson/node-fs-extra.svg)](https://coveralls.io/r/jprichardson/node-fs-extra)

<a href="https://github.com/feross/standard"><img src="https://cdn.jsdelivr.net/gh/feross/standard/sticker.svg" alt="Standard JavaScript" width="100"></a>


Why?
----

I got tired of including `mkdirp`, `rimraf`, and `ncp` in most of my projects.




Installation
------------

    npm install --save fs-extra



Usage
-----

`fs-extra` is a drop in replacement for native `fs`. All methods in `fs` are unmodified and attached to `fs-extra`.

You don't ever need to include the original `fs` module again:

```js
var fs = require('fs') // this is no longer necessary
```

you can now do this:

```js
var fs = require('fs-extra')
```

or if you prefer to make it clear that you're using `fs-extra` and not `fs`, you may want
to name your `fs` variable `fse` like so:

```js
var fse = require('fs-extra')
```

you can also keep both, but it's redundant:

```js
var fs = require('fs')
var fse = require('fs-extra')
```

Sync vs Async
-------------
Most methods are async by default (they take a callback with an `Error` as first argument).

Sync methods on the other hand will throw if an error occurs.

Example:

```js
var fs = require('fs-extra')

fs.copy('/tmp/myfile', '/tmp/mynewfile', function (err) {
  if (err) return console.error(err)
  console.log("success!")
});

try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile')
  console.log("success!")
} catch (err) {
  console.error(err)
}
```


Methods
-------
- [copy](docs/copy.md)
- [copySync](docs/copy.md)
- [emptyDir](docs/emptyDir.md)
- [emptyDirSync](docs/emptyDir.md)
- [ensureFile](docs/ensureFile.md)
- [ensureFileSync](docs/ensureFile.md)
- [ensureDir](docs/ensureDir.md)
- [ensureDirSync](docs/ensureDir.md)
- [ensureLink](docs/ensureLink.md)
- [ensureLinkSync](docs/ensureLink.md)
- [ensureSymlink](docs/ensureSymlink.md)
- [ensureSymlinkSync](docs/ensureSymlink.md)
- [mkdirs](docs/ensureDir.md)
- [mkdirsSync](docs/ensureDir.md)
- [move](docs/move.md)
- [outputFile](docs/outputFile.md)
- [outputFileSync](docs/outputFile.md)
- [outputJson](docs/outputJson.md)
- [outputJsonSync](docs/outputJson.md)
- [readJson](docs/readJson.md)
- [readJsonSync](docs/readJson.md)
- [remove](docs/remove.md)
- [removeSync](docs/remove.md)
- [writeJson](docs/writeJson.md)
- [writeJsonSync](docs/writeJson.md)


**NOTE:** You can still use the native Node.js methods. They are copied over to `fs-extra`.

### What happened to `walk()` and `walkSync()`?

They were removed from `fs-extra` in v2.0.0. If you need the functionality, `walk` and `walkSync` are available as separate packages, [`klaw`](https://github.com/jprichardson/node-klaw) and [`klaw-sync`](https://github.com/mawni/node-klaw-sync).


Third Party
-----------

### Promises

Use [Bluebird](https://github.com/petkaantonov/bluebird). See https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification. `fs-extra` is
explicitly listed as supported.

```js
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'))
```

Or you can use a dedicated package:

- [`fs-extra-promise`](https://github.com/overlookmotel/fs-extra-promise) uses Bluebird.
- [`fs-promise`](https://github.com/kevinbeaty/fs-promise) uses
  [Any Promise](https://github.com/kevinbeaty/any-promise) and also covers
  [`mz/fs`](https://github.com/normalize/mz/blob/master/fs.js).


### TypeScript

If you like TypeScript, you can use `fs-extra` with it: https://github.com/borisyankov/DefinitelyTyped/tree/master/fs-extra


### File / Directory Watching

If you want to watch for changes to files or directories, then you should use [chokidar](https://github.com/paulmillr/chokidar).


### Misc.

- [mfs](https://github.com/cadorn/mfs) - Monitor your fs-extra calls.



Hacking on fs-extra
-------------------

Wanna hack on `fs-extra`? Great! Your help is needed! [fs-extra is one of the most depended upon Node.js packages](http://nodei.co/npm/fs-extra.png?downloads=true&downloadRank=true&stars=true). This project
uses [JavaScript Standard Style](https://github.com/feross/standard) - if the name or style choices bother you,
you're gonna have to get over it :) If `standard` is good enough for `npm`, it's good enough for `fs-extra`.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

What's needed?
- First, take a look at existing issues. Those are probably going to be where the priority lies.
- More tests for edge cases. Specifically on different platforms. There can never be enough tests.
- Improve test coverage. See coveralls output for more info.

Note: If you make any big changes, **you should definitely file an issue for discussion first.**

### Running the Test Suite

fs-extra contains hundreds of tests.

- `npm run lint`: runs the linter ([standard](http://standardjs.com/))
- `npm run unit`: runs the unit tests
- `npm test`: runs both the linter and the tests


### Windows

If you run the tests on the Windows and receive a lot of symbolic link `EPERM` permission errors, it's
because on Windows you need elevated privilege to create symbolic links. You can add this to your Windows's
account by following the instructions here: http://superuser.com/questions/104845/permission-to-make-symbolic-links-in-windows-7
However, I didn't have much luck doing this.

Since I develop on Mac OS X, I use VMWare Fusion for Windows testing. I create a shared folder that I map to a drive on Windows.
I open the `Node.js command prompt` and run as `Administrator`. I then map the network drive running the following command:

    net use z: "\\vmware-host\Shared Folders"

I can then navigate to my `fs-extra` directory and run the tests.


Naming
------

I put a lot of thought into the naming of these functions. Inspired by @coolaj86's request. So he deserves much of the credit for raising the issue. See discussion(s) here:

* https://github.com/jprichardson/node-fs-extra/issues/2
* https://github.com/flatiron/utile/issues/11
* https://github.com/ryanmcgrath/wrench-js/issues/29
* https://github.com/substack/node-mkdirp/issues/17

First, I believe that in as many cases as possible, the [Node.js naming schemes](http://nodejs.org/api/fs.html) should be chosen. However, there are problems with the Node.js own naming schemes.

For example, `fs.readFile()` and `fs.readdir()`: the **F** is capitalized in *File* and the **d** is not capitalized in *dir*. Perhaps a bit pedantic, but they should still be consistent. Also, Node.js has chosen a lot of POSIX naming schemes, which I believe is great. See: `fs.mkdir()`, `fs.rmdir()`, `fs.chown()`, etc.

We have a dilemma though. How do you consistently name methods that perform the following POSIX commands: `cp`, `cp -r`, `mkdir -p`, and `rm -rf`?

My perspective: when in doubt, err on the side of simplicity. A directory is just a hierarchical grouping of directories and files. Consider that for a moment. So when you want to copy it or remove it, in most cases you'll want to copy or remove all of its contents. When you want to create a directory, if the directory that it's suppose to be contained in does not exist, then in most cases you'll want to create that too.

So, if you want to remove a file or a directory regardless of whether it has contents, just call `fs.remove(path)`. If you want to copy a file or a directory whether it has contents, just call `fs.copy(source, destination)`. If you want to create a directory regardless of whether its parent directories exist, just call `fs.mkdirs(path)` or `fs.mkdirp(path)`.


Credit
------

`fs-extra` wouldn't be possible without using the modules from the following authors:

- [Isaac Shlueter](https://github.com/isaacs)
- [Charlie McConnel](https://github.com/avianflu)
- [James Halliday](https://github.com/substack)
- [Andrew Kelley](https://github.com/andrewrk)




License
-------

Licensed under MIT

Copyright (c) 2011-2017 [JP Richardson](https://github.com/jprichardson)

[1]: http://nodejs.org/docs/latest/api/fs.html


[jsonfile]: https://github.com/jprichardson/node-jsonfile
