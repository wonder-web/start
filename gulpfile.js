'use strict';

var autoprefixer = require('autoprefixer'),
    gulp         = require('gulp'),
    watch        = require('gulp-watch'), // TODO ??
    nodemon      = require('gulp-nodemon'),
    del          = require('del'),
    postcss      = require('gulp-postcss'),

    postcssImport = require('postcss-import'), //for @import to work
    postcssMixins = require('postcss-mixins'), //for @mixins to work

    precss       = require('precss'),
    cssnext      = require('cssnext');
    //browserSync  = require('browser-sync').create();

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

gulp.task('default', ['clean', 'copy', 'css', 'node']);

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
    postcssMixins
  	/*cssnext,
  	precss*/
  ];
  
  return gulp.src('src/**/styles/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist'));
});