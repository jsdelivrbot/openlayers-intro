/* */ 
(function(process) {
  'use strict';
  var gulp = require('gulp'),
      mocha = require('gulp-mocha'),
      babel = require('gulp-babel'),
      git = require('gulp-git'),
      bump = require('gulp-bump'),
      filter = require('gulp-filter'),
      tagVersion = require('gulp-tag-version'),
      sourcemaps = require('gulp-sourcemaps'),
      plumber = require('gulp-plumber'),
      source = require('vinyl-source-stream'),
      browserify = require('browserify'),
      lazypipe = require('lazypipe'),
      eslint = require('gulp-eslint'),
      fs = require('fs');
  require('babel-register')({only: /escope\/(src|test)\//});
  var TEST = ['test/*.js'];
  var SOURCE = ['src/**/*.js'];
  var ESLINT_OPTION = {
    rules: {
      'quotes': 0,
      'eqeqeq': 0,
      'no-use-before-define': 0,
      'no-shadow': 0,
      'no-new': 0,
      'no-underscore-dangle': 0,
      'no-multi-spaces': 0,
      'no-native-reassign': 0,
      'no-loop-func': 0,
      'no-lone-blocks': 0
    },
    ecmaFeatures: {
      jsx: false,
      modules: true
    },
    env: {
      node: true,
      es6: true
    }
  };
  var BABEL_OPTIONS = JSON.parse(fs.readFileSync('.babelrc', {encoding: 'utf8'}));
  var build = lazypipe().pipe(sourcemaps.init).pipe(babel, BABEL_OPTIONS).pipe(sourcemaps.write).pipe(gulp.dest, 'lib');
  gulp.task('build-for-watch', function() {
    return gulp.src(SOURCE).pipe(plumber()).pipe(build());
  });
  gulp.task('build', function() {
    return gulp.src(SOURCE).pipe(build());
  });
  gulp.task('browserify', ['build'], function() {
    return browserify({entries: ['./lib/index.js']}).bundle().pipe(source('bundle.js')).pipe(gulp.dest('build'));
  });
  gulp.task('test', ['build'], function() {
    return gulp.src(TEST).pipe(mocha({
      reporter: 'spec',
      timeout: 100000
    }));
  });
  gulp.task('watch', ['build-for-watch'], function() {
    gulp.watch(SOURCE, ['build-for-watch']);
  });
  gulp.task('lint', function() {
    return gulp.src(SOURCE).pipe(eslint(ESLINT_OPTION)).pipe(eslint.formatEach('stylish', process.stderr)).pipe(eslint.failOnError());
  });
  function inc(importance) {
    return gulp.src(['./package.json']).pipe(bump({type: importance})).pipe(gulp.dest('./')).pipe(git.commit('Bumps package version')).pipe(filter('package.json')).pipe(tagVersion({prefix: ''}));
  }
  gulp.task('patch', ['build'], function() {
    return inc('patch');
  });
  gulp.task('minor', ['build'], function() {
    return inc('minor');
  });
  gulp.task('major', ['build'], function() {
    return inc('major');
  });
  gulp.task('travis', ['test']);
  gulp.task('default', ['travis']);
})(require('process'));
