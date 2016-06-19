'use strict';

var autoprefixer = require('autoprefixer'),
    gulp         = require('gulp'),
    watch        = require('gulp-watch'), // TODO ??
    nodemon      = require('gulp-nodemon'),
    Icons        = require('gulp-svg-icons'),

    runSequence  = require('run-sequence'), // for async gulp tasks
    del          = require('del'),
    postcss      = require('gulp-postcss'),

    postcssImport    = require('postcss-import'), //for @import to work
    postcssMixins    = require('postcss-mixins'), //for @mixins to work
    postcssSVars     = require('postcss-simple-vars'), // for $vars
    postcssNested    = require('postcss-nested'), //https://github.com/postcss/postcss-nested
    postcssCMedia    = require('postcss-custom-media'),
    postcssMMinmax   = require('postcss-media-minmax'),
    postcssClearfix  = require('postcss-clearfix'), //https://github.com/seaneking/postcss-clearfix

    postcssFocus     = require('postcss-focus'),
    postcssAssets    = require('postcss-assets'), //TODO add below
    postcssBColors   = require('postcss-brand-colors'),
    postcssCAlpha    = require('postcss-color-alpha'),
    postcssCFunction = require('postcss-color-function'),

    postcssCalc      = require('postcss-calc'),
    postcssSize      = require('postcss-size'),
    postcssEasings   = require('postcss-easings'),
    postcssWChange   = require('postcss-will-change'),

    precss       = require('precss'),
    cssnext      = require('cssnext')
;
    //browserSync  = require('browser-sync').create();

var icons = new Icons('src/0-index-module/img/');

/* ==========================================================================
   Variables
   ========================================================================== */

var paths = {
  css: '/src/*/styles/*.css',
  fonts: 'src/fonts/*',
  js: 'src/scripts/*.js',
  img: 'src/img/*',
  assets: 'src/assets/*'
};

gulp.task('default', function(callback) {
  runSequence('clean',
              'copy',
              'css',
              callback);
});

//gulp.task('sync', ['clean', 'copy', 'css']);

gulp.task('node', function () {
  nodemon({
    script: 'dist/app.js',
    env: { 'NODE_ENV': 'development' }
  })
})


gulp.task('clean', function () {
  return del([
    'dist'
  ]);
});

//no .css in this copy
gulp.task('copy', function () {
  return gulp.src(['src/**/*', '!src/**/styles/*.css']) 
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  var processors = [
  	autoprefixer,
    postcssImport,
    postcssMixins,
    postcssSVars,
    postcssNested,
    postcssCMedia,
    postcssMMinmax,
    postcssClearfix,

    postcssFocus,

    postcssBColors,
    postcssCAlpha,
    postcssCFunction,

    postcssCalc,
    postcssSize,
    postcssEasings,
    postcssWChange
  	/*cssnext,
  	precss*/
  ];
  
  return gulp.src('src/**/styles/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist'));
});